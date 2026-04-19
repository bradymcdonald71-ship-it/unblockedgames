import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, X, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function GameModal({ game, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when game changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setHasStarted(false);
      setIsLoading(true);
    }
  }, [isOpen, game?.id]);

  if (!game) return null;

  const handleOpenNewTab = () => {
    window.open(game.iframeUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        showCloseButton={false}
        className={`max-w-5xl w-[95vw] p-0 overflow-hidden bg-bg-surface border-border-subtle flex flex-col gap-0 sm:max-w-5xl transition-all duration-500 ${isFullscreen ? 'h-screen max-w-none w-screen rounded-none' : 'h-[85vh]'}`}
      >
        <DialogHeader className="p-4 border-b border-border-subtle flex flex-row items-center justify-between space-y-0 bg-bg-surface/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-serif text-accent-gold italic">
              {game.title}
            </DialogTitle>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[2px] hidden sm:inline px-2 py-0.5 border border-border-subtle rounded-full">
              {game.category} // ARCHIVE_READY
            </span >
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOpenNewTab}
              title="Open in New Tab"
              className="text-text-secondary hover:text-accent-gold transition-colors hidden sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Toggle Fullscreen"
              className="text-text-secondary hover:text-accent-gold transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border-subtle mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-text-secondary hover:text-white hover:bg-red-950/20 transition-all"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-grow relative bg-[#050506] overflow-hidden group">
          {!hasStarted ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-deep/95 backdrop-blur-sm">
              <div className="relative mb-8 group/play">
                <div className="absolute -inset-4 bg-accent-gold/20 rounded-full blur-xl group-hover/play:bg-accent-gold/40 transition-all duration-500 animate-pulse" />
                <Button 
                  onClick={() => setHasStarted(true)}
                  className="relative h-20 w-20 rounded-full bg-accent-gold hover:bg-accent-gold/90 text-bg-deep shadow-[0_0_50px_rgba(197,160,89,0.3)] hover:scale-110 transition-all duration-300"
                >
                  <Play className="h-8 w-8 fill-current" />
                </Button>
              </div>
              <h4 className="text-accent-gold font-serif italic text-2xl mb-2 tracking-wide">Initialize Database</h4>
              <p className="text-text-secondary font-mono text-[10px] uppercase tracking-[3px] opacity-60">Ready to execute: {game.title}</p>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-deep">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
                    <p className="text-text-secondary font-mono text-[10px] uppercase tracking-[4px] animate-pulse">Establishing Connection...</p>
                  </div>
                </div>
              )}
              <iframe
                src={game.iframeUrl}
                className="w-full h-full border-none"
                title={game.title}
                onLoad={() => setIsLoading(false)}
                allow="autoplay; gamepad; fullscreen; pointer-lock; microphone; camera; geolocation; clipboard-read; clipboard-write; encrypted-media; midi; gyroscope; accelerometer; magnetometer"
                allowFullScreen
                referrerPolicy="no-referrer"
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
