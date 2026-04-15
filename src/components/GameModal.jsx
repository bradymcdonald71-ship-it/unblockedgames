import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function GameModal({ game, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`max-w-5xl w-[95vw] p-0 overflow-hidden bg-bg-surface border-border-subtle ${isFullscreen ? 'h-screen max-w-none w-screen rounded-none' : 'h-[85vh]'}`}>
        <DialogHeader className="p-4 border-b border-border-subtle flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-serif text-accent-gold italic">
              {game.title}
            </DialogTitle>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[2px] hidden sm:inline">
              {game.category} // ARCHIVE_ACCESS
            </span >
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-text-secondary hover:text-accent-gold transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-text-secondary hover:text-accent-gold transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-grow relative bg-black">
          <iframe
            src={game.iframeUrl}
            className="w-full h-full border-none"
            title={game.title}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
