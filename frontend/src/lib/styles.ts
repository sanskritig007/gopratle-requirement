export const getInputStyles = (isDark: boolean, hasError?: boolean) => {
  if (hasError) {
    return isDark
      ? 'bg-slate-900/90 border-rose-500 text-white placeholder-slate-500 focus:ring-rose-500/30'
      : 'bg-slate-50 border-rose-500 text-slate-900 placeholder-slate-400 focus:ring-rose-500/30';
  }
  return isDark
    ? 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500/20'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-orange-500/20 shadow-xs';
};

export const getSectionStyles = (isDark: boolean) =>
  isDark
    ? 'bg-slate-900/40 border-slate-800/80'
    : 'bg-slate-50/90 border-slate-200/90 shadow-xs';

export const getCardInactiveStyles = (isDark: boolean) =>
  isDark
    ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700'
    : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm';
