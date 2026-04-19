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
      <header className="sticky top-0 z-40 bg-bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-10 h-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="h-10 w-10 rounded-lg bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20 group-hover:border-accent-gold/50 transition-all duration-500">
              <Gamepad2 className="text-accent-gold h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif italic tracking-wider text-accent-gold leading-none">
                ARCANE HUB
              </h1>
              <p className="text-[9px] font-mono text-text-secondary uppercase tracking-[3px] mt-1">Archive_Terminal_v4.2</p>
            </div>
          </div>

          <div className="flex-grow max-w-xl relative group hidden sm:block">
            <div className="absolute inset-0 bg-accent-gold/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary group-focus-within:text-accent-gold transition-colors" />
            <Input
              placeholder="Query the Archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0b] border-border-subtle rounded-full h-12 pl-11 pr-4 text-sm focus:border-accent-gold transition-all font-mono shadow-inner"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[2px] font-mono text-text-secondary">
              <span className="text-accent-gold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-pulse" />
                SYSTEM: ONLINE
              </span>
            </div>
            <Github className="text-text-secondary hover:text-accent-gold cursor-pointer transition-colors h-5 w-5" />
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Category Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-8 mb-4 no-scrollbar scrollbar-hide">
            <button 
              onClick={() => setSearchQuery('')}
              className={`px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all whitespace-nowrap ${searchQuery === '' ? 'bg-accent-gold text-bg-deep border-accent-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'bg-transparent text-text-secondary border-border-subtle hover:border-accent-gold/40 hover:text-accent-gold'}`}
            >
              All_Sectors
            </button>
            {Object.keys(gamesByCategory).map(category => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className={`px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all whitespace-nowrap ${searchQuery.toLowerCase() === category.toLowerCase() ? 'bg-accent-gold text-bg-deep border-accent-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'bg-transparent text-text-secondary border-border-subtle hover:border-accent-gold/40 hover:text-accent-gold'}`}
              >
                {category}
              </button>
            ))}
          </div>

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
