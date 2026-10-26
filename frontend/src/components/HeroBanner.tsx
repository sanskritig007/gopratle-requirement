'use client';

import React from 'react';
import { Star, Sparkles, Mic2, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CategoryType } from '@/types/requirement';

interface HeroBannerProps {
  onSelectCategory: (category: CategoryType) => void;
  activeCategory: CategoryType;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <section className="relative w-full rounded-3xl hero-sunset-gradient p-6 sm:p-10 md:p-14 text-white shadow-2xl mb-10 border border-white/10 overflow-hidden">
      {/* Decorative blurred glow orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Rating Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
          <div className="flex items-center text-amber-300">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold">5.0</span>
          <span className="text-white/70">•</span>
          <span className="text-white/90">Trusted by 2,500+ Event Hosts</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
          Your Event Programming <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-white bg-clip-text text-transparent">
            Just Got Easier
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
          Post your requirement once and let certified event planners, headline performers, and technical crew connect with you directly.
        </p>

        {/* Quick Category Jump Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onSelectCategory('planner')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all backdrop-blur-md ${
              activeCategory === 'planner'
                ? 'bg-white text-slate-950 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <span>🎪</span>
            <span>Event Planners</span>
            {activeCategory === 'planner' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('performer')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all backdrop-blur-md ${
              activeCategory === 'performer'
                ? 'bg-white text-slate-950 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <span>🎸</span>
            <span>Performers & DJs</span>
            {activeCategory === 'performer' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('crew')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all backdrop-blur-md ${
              activeCategory === 'crew'
                ? 'bg-white text-slate-950 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <span>🛠️</span>
            <span>Crew & Technicians</span>
            {activeCategory === 'crew' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Floating Interactive Mini Cards (Dribbble Style) */}
      <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-lg">
            🎪
          </div>
          <div>
            <div className="text-xs font-bold text-white">Full-Scale Planners</div>
            <div className="text-[11px] text-white/70">350+ Verified Partners • ₹0 Fee</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-300 flex items-center justify-center font-bold text-lg">
            🎸
          </div>
          <div>
            <div className="text-xs font-bold text-white">Bands, DJs & Anchors</div>
            <div className="text-[11px] text-white/70">1,200+ Stage Artists Ready</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-300 flex items-center justify-center font-bold text-lg">
            🛠️
          </div>
          <div>
            <div className="text-xs font-bold text-white">4K Photo, Audio & Lights</div>
            <div className="text-[11px] text-white/70">Guaranteed Shift Execution</div>
          </div>
        </div>
      </div>
    </section>
  );
};
