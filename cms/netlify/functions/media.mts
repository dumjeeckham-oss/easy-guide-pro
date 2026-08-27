import { createHash, timingSafeEqual, randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const isAuthorized = (request: Request) => {
  const expectedHash = Netlify.env.get("CMS_ADMIN_TOKEN_HASH");
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expectedHash || !token) return false;
  const provided = createHash("sha256").update(token).digest();
  const expected = Buffer.from(expectedHash, "hex");
  return provided.length === expected.length && timingSafeEqual(provided, expected);
};

const errorResponse = (message: string, status: number) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export default async (request: Request, context: Context) => {
  const store = getStore({ name: "easy-guide-pro-media", consistency: "strong" });
  const id = context.params.id;

  if (request.method === "GET" && id) {
    const result = await store.getWithMetadata(`uploads/${id}`, { type: "arrayBuffer" });
    if (!result?.data) return errorResponse("이미지를 찾을 수 없습니다.", 404);
    return new Response(result.data, {
      headers: {
        "Content-Type": String(result.metadata.contentType || "application/octet-stream"),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (request.method !== "POST") return errorResponse("허용되지 않은 요청입니다.", 405);
  if (!isAuthorized(request)) return errorResponse("관리자 키가 올바르지 않습니다.", 401);

  const contentType = request.headers.get("content-type") ?? "";
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(contentType)) return errorResponse("JPG, PNG, WEBP, GIF 이미지만 올릴 수 있습니다.", 400);

  const data = await request.arrayBuffer();
  if (!data.byteLength || data.byteLength > 5 * 1024 * 1024) return errorResponse("이미지는 5MB 이하여야 합니다.", 400);

  const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[contentType];
  const idWithExtension = `${randomUUID()}.${extension}`;
  await store.set(`uploads/${idWithExtension}`, data, {
    metadata: { contentType, uploadedAt: new Date().toISOString() },
  });

  const url = new URL(`/api/media/${idWithExtension}`, request.url).toString();
  return new Response(JSON.stringify({ url }), {
    status: 201,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};

export const config: Config = { path: ["/api/media", "/api/media/:id"] };
