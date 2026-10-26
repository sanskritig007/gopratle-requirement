'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Compass,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IRequirementItem } from '@/types/requirement';

interface SubmissionSuccessProps {
  createdItem: IRequirementItem;
  onPostAnother: () => void;
  onViewFeed: () => void;
  theme?: 'dark' | 'light';
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  createdItem,
  onPostAnother,
  onViewFeed,
  theme = 'dark',
}) => {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5b35', '#f59e0b', '#8b5cf6', '#10b981'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopyId = () => {
    if (createdItem?._id) {
      navigator.clipboard.writeText(createdItem._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 text-center space-y-6 max-w-lg mx-auto animate-fadeIn">
      {/* Celebration Icon with animated glow */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/25">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
      </div>

      {/* Headings */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Saved to MongoDB Atlas</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Requirement Published!
        </h2>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Your event has been successfully categorized as a{' '}
          <strong className="text-orange-500 uppercase">{createdItem.category}</strong> requirement and is now open for verified proposals.
        </p>
      </div>

      {/* Requirement ID Card with 1-click Copy */}
      <div className={`p-4 rounded-2xl border text-left space-y-2 ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            MongoDB Requirement ID
          </span>
          <button
            type="button"
            onClick={handleCopyId}
            className={`flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                : isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <div className="font-mono text-xs text-orange-500 font-bold break-all select-all">
          {createdItem._id}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onViewFeed}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>View in Live Feed</span>
        </button>

        <button
          type="button"
          onClick={onPostAnother}
          className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-colors cursor-pointer ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Another Event</span>
        </button>
      </div>
    </div>
  );
};
