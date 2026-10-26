'use client';

import React from 'react';
import { Sparkles, Compass, PlusCircle, Sun, Moon } from 'lucide-react';
import { CategoryType } from '@/types/requirement';

interface NavbarProps {
  activeTab: 'wizard' | 'feed';
  onTabChange: (tab: 'wizard' | 'feed') => void;
  onFillSample: (category?: CategoryType) => void;
  feedCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onFillSample,
  feedCount,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        isDark
          ? 'border-slate-800/80 bg-slate-950/80 text-white'
          : 'border-slate-200/90 bg-white/85 text-slate-900'
      } backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('wizard')}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 p-[1.5px] shadow-lg shadow-orange-500/20">
            <div className={`h-full w-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                G
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Go<span className="text-orange-500">Pratle</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 uppercase tracking-wider">
                Host Portal
              </span>
            </div>
            <p className={`text-[11px] hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Event Requirement Engine
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className={`flex items-center p-1 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button
            type="button"
            onClick={() => onTabChange('wizard')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'wizard'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Requirement</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('feed')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Live Feed</span>
            {feedCount > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isDark ? 'bg-slate-800 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-600 border border-orange-300'}`}>
                {feedCount}
              </span>
            )}
          </button>
        </div>

        {/* Right Actions: Theme Toggle + Demo Presets */}
        <div className="flex items-center space-x-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300 shadow-sm'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 shadow-sm'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 transition-transform hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />}
          </button>

          {/* Quick Demo Fill dropdown / button */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 hover:from-purple-500/20 hover:to-orange-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 transition-all shadow-sm"
              title="Auto-fill sample data for quick evaluation"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
              <span className="hidden md:inline">Demo Presets</span>
              <span className="md:hidden">Demo</span>
            </button>

            {/* Dropdown menu */}
            <div className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 hidden group-hover:block transition-all z-50 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                1-Click Auto Fill
              </p>
              <button
                type="button"
                onClick={() => onFillSample('planner')}
                className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center space-x-2 transition-colors ${isDark ? 'text-slate-200 hover:bg-amber-500/10 hover:text-amber-300' : 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'}`}
              >
                <span>🎪</span>
                <div>
                  <div className="font-semibold">Wedding Planner</div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Jaipur Heritage Wedding</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onFillSample('performer')}
                className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center space-x-2 transition-colors ${isDark ? 'text-slate-200 hover:bg-purple-500/10 hover:text-purple-300' : 'text-slate-700 hover:bg-purple-50 hover:text-purple-700'}`}
              >
                <span>🎸</span>
                <div>
                  <div className="font-semibold">Performer (DJ)</div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tech Summit After-Party</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onFillSample('crew')}
                className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center space-x-2 transition-colors ${isDark ? 'text-slate-200 hover:bg-blue-500/10 hover:text-blue-300' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'}`}
              >
                <span>🛠️</span>
                <div>
                  <div className="font-semibold">Crew & Staff</div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Goa Music Festival</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
