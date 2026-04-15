import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

export const GameCard = ({ game, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="cursor-pointer"
      onClick={() => onClick(game)}
    >
      <Card className="sophisticated-card overflow-hidden h-full flex flex-col p-6 relative">
        <div className="absolute top-3 right-3 z-10">
          <div className="gold-badge">
            {game.category}
          </div>
        </div>
        
        <div className="aspect-video relative overflow-hidden rounded-sm mb-6 bg-gradient-to-br from-[#252529] to-[#111113] flex items-center justify-center">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="object-cover w-full h-full opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-serif text-5xl text-accent-gold/10 select-none">
              {game.title.charAt(0)}
            </span>
          </div>
        </div>

        <CardContent className="p-0 flex-grow">
          <h3 className="text-lg font-serif text-text-primary mb-1">{game.title}</h3>
          <p className="text-[12px] text-text-secondary uppercase tracking-wider">{game.category} / Archive Entry</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
