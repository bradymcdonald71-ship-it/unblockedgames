import { useState, useMemo } from "react";
import gamesData from "./games.json";
import { GameCard } from "./components/GameCard";
import { GameModal } from "./components/GameModal";
import { Input } from "@/components/ui/input";
import { Search, Gamepad2, Github, Twitter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const games = gamesData;

  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, games]);

  const gamesByCategory = useMemo(() => {
    const grouped = filteredGames.reduce((acc, game) => {
      const category = game.category || "Unclassified";
      if (!acc[category]) acc[category] = [];
      acc[category].push(game);
      return acc;
    }, {});

    // Sort categories alphabetically
    const sortedCategories = Object.keys(grouped).sort();
    
    // Sort games within each category alphabetically by title
    const sortedGrouped = {};
    sortedCategories.forEach(category => {
      sortedGrouped[category] = [...grouped[category]].sort((a, b) => 
        a.title.localeCompare(b.title)
      );
    });

    return sortedGrouped;
  }, [filteredGames]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-bg-surface border-b border-border-subtle px-10 h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-2xl font-serif italic tracking-wider text-accent-gold">
              ARCANE HUB.
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-[2px] font-medium text-text-secondary">
            <a href="#" className="text-accent-gold">Vault</a>
            <a href="#" className="hover:text-text-primary transition-colors">Chronicle</a>
            <a href="#" className="hover:text-text-primary transition-colors">Archive</a>
            <a href="#" className="hover:text-text-primary transition-colors">Settings</a>
          </div>

          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Find a title..."
              className="pl-10 h-9 bg-bg-card border-border-subtle text-text-primary text-[13px] rounded-sm focus:border-accent-gold transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow p-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16 py-12 text-center border-b border-border-subtle">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-serif italic tracking-tight mb-4 text-text-primary"
            >
              The Grand <span className="text-accent-gold">Archive</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary max-w-2xl mx-auto text-sm uppercase tracking-[3px]"
            >
              A curated collection of unblocked titles for the discerning player.
            </motion.p>
          </section>

          {/* Games Grid by Sector */}
          <div className="space-y-24">
            {Object.entries(gamesByCategory).map(([category, categoryGames]) => (
              <section key={category} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-accent-gold/50 uppercase tracking-[3px] mb-1.5 flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent-gold rounded-full" />
                      Vault Sector
                    </span>
                    <h3 className="text-2xl font-serif italic text-accent-gold lowercase tracking-[4px] flex items-center gap-3">
                      // {category}
                      <span className="text-[10px] font-mono text-text-secondary not-italic tracking-normal opacity-50 px-2 border border-border-subtle rounded-full">
                        {categoryGames.length}
                      </span>
                    </h3>
                  </div>
                  <div className="h-px flex-grow bg-linear-to-r from-border-subtle to-transparent mt-8" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence mode="popLayout">
                    {categoryGames.map((game) => (
                      <GameCard key={game.id} game={game} onClick={handleGameClick} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-24">
              <p className="text-text-secondary font-mono text-xs uppercase tracking-[2px]">
                No entries found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 px-10 bg-bg-surface border-t border-border-subtle flex items-center justify-between text-[11px] text-text-secondary font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full" />
          <span className="uppercase">database.json: {games.length} ENTRIES LOADED</span>
        </div>
        
        <div className="hidden md:block uppercase">
          SESSION: 00H 00M — LATENCY: 12MS
        </div>

        <div className="uppercase">
          ENCRYPTION: ACTIVE (RSA-2048)
        </div>
      </footer>

      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
