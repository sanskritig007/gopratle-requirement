'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { IRequirementItem, CategoryType } from '@/types/requirement';
import { fetchRequirements, deleteRequirement } from '@/lib/api';
import { RequirementDetailModal } from './RequirementDetailModal';

interface RequirementFeedProps {
  onPostNew: () => void;
  theme: 'dark' | 'light';
}

export function RequirementFeed({ onPostNew, theme }: RequirementFeedProps) {
  const isDark = theme === 'dark';

  const [items, setItems] = useState<IRequirementItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<IRequirementItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load requirements from API
  const loadRequirements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchRequirements({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery.trim() || undefined,
      });
      if (res.success) {
        setItems(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load requirements');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadRequirements();
  }, [loadRequirements]);

  // Handle delete
  const handleDelete = async (id: string, eventTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteRequirement(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete requirement');
    } finally {
      setDeletingId(null);
    }
  };

  // Category counts
  const counts = {
    all: items.length,
    planner: items.filter((i) => i.category === 'planner').length,
    performer: items.filter((i) => i.category === 'performer').length,
    crew: items.filter((i) => i.category === 'crew').length,
  };

  const getCategoryTheme = (cat: CategoryType) => {
    switch (cat) {
      case 'planner':
        return {
          label: 'Event Planner',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          icon: '✨',
          cardBorder: 'hover:border-rose-500/50',
        };
      case 'performer':
        return {
          label: 'Performer',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: '🎵',
          cardBorder: 'hover:border-purple-500/50',
        };
      case 'crew':
        return {
          label: 'Event Crew',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: '🛠️',
          cardBorder: 'hover:border-amber-500/50',
        };
      default:
        return {
          label: cat,
          badge: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
          icon: '📋',
          cardBorder: 'hover:border-slate-500/50',
        };
    }
  };

  const formatDate = (item: IRequirementItem) => {
    if (!item.startDate) return 'Date TBD';
    const s = new Date(item.startDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
    if (item.dateType === 'range' && item.endDate) {
      const e = new Date(item.endDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      });
      return `${s} – ${e}`;
    }
    return s;
  };

  return (
    <div className="space-y-8">
      {/* Feed Controls Header */}
      <div
        className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-all ${
          isDark
            ? 'bg-slate-950/70 border-slate-800/80 text-white'
            : 'bg-white border-slate-200/90 text-slate-900 shadow-slate-200/50'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Live Marketplace Feed</h2>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Real-time active requirements posted by event hosts across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadRequirements}
              disabled={isLoading}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span className={isLoading ? 'animate-spin' : ''}>🔄</span>
              Refresh
            </button>

            <button
              type="button"
              onClick={onPostNew}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span>+</span>
              Post Requirement
            </button>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Requirements', icon: '🌐' },
              { id: 'planner', label: 'Planners', icon: '✨' },
              { id: 'performer', label: 'Performers', icon: '🎵' },
              { id: 'crew', label: 'Crew & Staff', icon: '🛠️' },
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 font-semibold shadow-xs'
                        : 'bg-orange-50 border-orange-300 text-orange-600 font-semibold shadow-xs'
                      : isDark
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      : 'bg-slate-100/80 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative sm:w-64">
            <input
              type="text"
              placeholder="Search by event, city, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-8 py-1.5 rounded-xl text-xs border transition-all outline-hidden ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500'
              }`}
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center justify-between">
          <div>⚠️ {error}</div>
          <button
            type="button"
            onClick={loadRequirements}
            className="underline font-semibold hover:text-rose-100"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`p-6 rounded-3xl border animate-pulse space-y-4 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <div className="h-5 w-24 bg-slate-800/80 rounded-full" />
              <div className="h-6 w-3/4 bg-slate-800/80 rounded-lg" />
              <div className="h-4 w-1/2 bg-slate-800/60 rounded-md" />
              <div className="h-20 bg-slate-800/40 rounded-2xl" />
              <div className="h-8 bg-slate-800/50 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && items.length === 0 && (
        <div
          className={`py-16 text-center rounded-3xl border p-8 space-y-4 ${
            isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="text-4xl">📭</div>
          <h3 className="text-base font-bold">No Requirements Found</h3>
          <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {searchQuery
              ? `No event postings match "${searchQuery}". Try adjusting your filters or search keywords.`
              : 'There are currently no requirements posted under this category. Be the first host to post one!'}
          </p>
          <button
            type="button"
            onClick={onPostNew}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white cursor-pointer shadow-md transition-all inline-block"
          >
            + Post First Requirement
          </button>
        </div>
      )}

      {/* Requirements Cards Grid */}
      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const catInfo = getCategoryTheme(item.category);
            const isDeleting = deletingId === item._id;

            return (
              <div
                key={item._id}
                className={`group rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-md ${catInfo.cardBorder} ${
                  isDark
                    ? 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/90'
                    : 'bg-white border-slate-200/90 hover:shadow-xl hover:shadow-slate-200/80'
                }`}
              >
                {/* Card Top Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${catInfo.badge}`}
                    >
                      <span>{catInfo.icon}</span>
                      {catInfo.label}
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.eventType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold tracking-tight line-clamp-1 group-hover:text-orange-400 transition-colors">
                      {item.eventName}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <span>📍</span>
                      <span className="truncate">
                        {item.venue ? `${item.venue}, ` : ''}
                        {item.location.city}, {item.location.state}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                    <span>🗓️</span>
                    <span>{formatDate(item)}</span>
                  </div>

                  {/* Highlights Box based on category */}
                  <div
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 mt-3 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {item.category === 'planner' && item.plannerDetails && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Budget:</span>
                          <span className="font-bold text-emerald-400">
                            ₹{item.plannerDetails.budgetMin?.toLocaleString('en-IN')} – ₹
                            {item.plannerDetails.budgetMax?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Guests:</span>
                          <span className="font-semibold">
                            👥 {item.plannerDetails.guestCount || 'Flexible'}
                          </span>
                        </div>
                        {item.plannerDetails.servicesNeeded && (
                          <div className="text-[11px] text-slate-400 truncate">
                            Services: {item.plannerDetails.servicesNeeded.slice(0, 2).join(', ')}
                            {item.plannerDetails.servicesNeeded.length > 2 && ' +more'}
                          </div>
                        )}
                      </>
                    )}

                    {item.category === 'performer' && item.performerDetails && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Budget:</span>
                          <span className="font-bold text-emerald-400">
                            {item.performerDetails.budgetMax
                              ? `₹${item.performerDetails.budgetMin?.toLocaleString('en-IN')} – ₹${item.performerDetails.budgetMax?.toLocaleString('en-IN')}`
                              : '₹25,000 – ₹75,000'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Format:</span>
                          <span className="font-bold text-purple-300">
                            🎤 {item.performerDetails.performanceType || 'Performer'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Sets & Duration:</span>
                          <span className="font-semibold">
                            ⏱️ {item.performerDetails.durationHours}h ({item.performerDetails.numberOfSets} sets)
                          </span>
                        </div>
                        {item.performerDetails.genres && (
                          <div className="text-[11px] text-purple-400 truncate">
                            Genres: {item.performerDetails.genres.slice(0, 2).join(', ')}
                          </div>
                        )}
                      </>
                    )}

                    {item.category === 'crew' && item.crewDetails && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Budget:</span>
                          <span className="font-bold text-emerald-400">
                            {item.crewDetails.budgetMax
                              ? `₹${item.crewDetails.budgetMin?.toLocaleString('en-IN')} – ₹${item.crewDetails.budgetMax?.toLocaleString('en-IN')}`
                              : '₹30,000 – ₹75,000'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Crew Size:</span>
                          <span className="font-bold text-amber-400">
                            👥{' '}
                            {item.crewDetails.rolesNeeded?.reduce(
                              (sum, r) => sum + (r.count || 0),
                              0
                            ) || 0}{' '}
                            Members
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Shift:</span>
                          <span className="font-semibold text-[11px]">
                            ⏰ {item.crewDetails.shiftStartTime} – {item.crewDetails.shiftEndTime}
                          </span>
                        </div>
                        {item.crewDetails.rolesNeeded && (
                          <div className="text-[11px] text-slate-400 truncate">
                            Roles: {item.crewDetails.rolesNeeded.map((r) => `${r.count}x ${r.role}`).slice(0, 2).join(', ')}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-5 pt-4 border-t border-slate-800/40 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/20 transition-all cursor-pointer text-center"
                  >
                    View Full Brief →
                  </button>

                  <button
                    type="button"
                    title="Delete Requirement"
                    disabled={isDeleting}
                    onClick={() => handleDelete(item._id, item.eventName)}
                    className={`p-2 rounded-xl text-xs border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10'
                        : 'border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    {isDeleting ? '⏳' : '🗑️'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Requirement Details Modal */}
      {selectedItem && (
        <RequirementDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          theme={theme}
        />
      )}
    </div>
  );
}
