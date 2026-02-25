import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";

interface CanvaViewerProps {
  src: string;
  title: string;
}

export const CanvaViewer = ({ src, title }: CanvaViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className="space-y-3">
        <div className="aspect-[4/3] w-full relative group">
          <iframe
            src={src}
            className="w-full h-full rounded-lg border-0"
            title={title}
            allowFullScreen
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition-opacity shadow-lg"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="w-4 h-4 mr-1" />
            전체화면
          </Button>
        </div>
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 border-0 rounded-none [&>button]:hidden">
          <div className="relative w-full h-full bg-black">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-50 rounded-full shadow-lg"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            <iframe
              src={src}
              className="w-full h-full border-0"
              title={title}
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
