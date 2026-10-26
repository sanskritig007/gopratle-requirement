'use client';

import React, { useEffect } from 'react';
import { IRequirementItem } from '@/types/requirement';

interface RequirementDetailModalProps {
  item: IRequirementItem | null;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export function RequirementDetailModal({ item, onClose, theme }: RequirementDetailModalProps) {
  const isDark = theme === 'dark';

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const categoryTheme = {
    planner: {
      label: 'Event Planner',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      icon: '✨',
      accent: 'text-rose-400',
    },
    performer: {
      label: 'Performer / Artist',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      icon: '🎵',
      accent: 'text-purple-400',
    },
    crew: {
      label: 'Event Crew & Staff',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: '🛠️',
      accent: 'text-amber-400',
    },
  }[item.category] || {
    label: item.category,
    badge: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    icon: '📋',
    accent: 'text-slate-400',
  };

  const formattedDate = () => {
    if (!item.startDate) return 'Date TBD';
    const start = new Date(item.startDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    if (item.dateType === 'range' && item.endDate) {
      const end = new Date(item.endDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      return `${start} – ${end}`;
    }
    return start;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-200 z-10 ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Header Bar */}
        <div
          className={`px-6 py-5 border-b flex items-start justify-between gap-4 ${
            isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${categoryTheme.badge}`}
              >
                <span>{categoryTheme.icon}</span>
                {categoryTheme.label}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                  item.status === 'open'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                }`}
              >
                ● {item.status || 'open'}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {item.eventType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{item.eventName}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Quick Info Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Date & Schedule
              </div>
              <div className="text-sm font-semibold mt-0.5 flex items-center gap-1.5">
                <span>🗓️</span> {formattedDate()}
                <span className="text-[10px] text-slate-400">({item.dateType})</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Venue & Location
              </div>
              <div className="text-sm font-semibold mt-0.5 flex items-center gap-1.5">
                <span>📍</span>
                {item.venue ? `${item.venue}, ` : ''}
                {item.location.city}, {item.location.state}
              </div>
            </div>
          </div>

          {/* Category-Specific Breakdown */}
          {item.category === 'planner' && item.plannerDetails && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-400">
                Planner Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Expected Guests</div>
                  <div className="text-base font-bold mt-1">
                    👥 {item.plannerDetails.guestCount || 'Not specified'}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl border col-span-1 sm:col-span-2 ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Budget Estimate</div>
                  <div className="text-base font-bold mt-1 text-emerald-400">
                    💰 ₹{item.plannerDetails.budgetMin?.toLocaleString('en-IN') || '0'} – ₹
                    {item.plannerDetails.budgetMax?.toLocaleString('en-IN') || 'Flexible'}
                  </div>
                </div>
              </div>

              {item.plannerDetails.servicesNeeded && item.plannerDetails.servicesNeeded.length > 0 && (
                <div>
                  <div className="text-xs text-slate-400 mb-2 font-medium">Services Requested:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.plannerDetails.servicesNeeded.map((s, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                          isDark
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(item.plannerDetails.themeOrVibe || item.plannerDetails.cateringPreference) && (
                <div
                  className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                    isDark ? 'bg-slate-950/30 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {item.plannerDetails.themeOrVibe && (
                    <div>
                      <span className="text-slate-400 font-medium">Theme / Vibe:</span>{' '}
                      <span className="font-semibold">{item.plannerDetails.themeOrVibe}</span>
                    </div>
                  )}
                  {item.plannerDetails.cateringPreference && (
                    <div>
                      <span className="text-slate-400 font-medium">Catering Preference:</span>{' '}
                      <span className="font-semibold">{item.plannerDetails.cateringPreference}</span>
                    </div>
                  )}
                </div>
              )}

              {item.plannerDetails.specialInstructions && (
                <div>
                  <div className="text-xs text-slate-400 mb-1">Host Notes / Instructions:</div>
                  <p
                    className={`text-xs p-3 rounded-xl border leading-relaxed ${
                      isDark
                        ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    "{item.plannerDetails.specialInstructions}"
                  </p>
                </div>
              )}
            </div>
          )}

          {item.category === 'performer' && item.performerDetails && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
                Performance Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Format</div>
                  <div className="text-sm font-bold mt-1">
                    🎤 {item.performerDetails.performanceType || 'Performer'}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Set Duration</div>
                  <div className="text-sm font-bold mt-1">
                    ⏱️ {item.performerDetails.durationHours} hrs ({item.performerDetails.numberOfSets}{' '}
                    sets)
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Sound / PA System</div>
                  <div className="text-xs font-bold mt-1 text-purple-300">
                    🔊{' '}
                    {item.performerDetails.soundProvidedByHost
                      ? 'Provided by Host'
                      : 'Performer brings own'}
                  </div>
                </div>
              </div>

              {item.performerDetails.genres && item.performerDetails.genres.length > 0 && (
                <div>
                  <div className="text-xs text-slate-400 mb-2 font-medium">Musical Genres:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.performerDetails.genres.map((g, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                          isDark
                            ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}
                      >
                        ♫ {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.performerDetails.stageSpecifications && (
                <div>
                  <div className="text-xs text-slate-400 mb-1">Stage Specifications:</div>
                  <p
                    className={`text-xs p-3 rounded-xl border ${
                      isDark
                        ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {item.performerDetails.stageSpecifications}
                  </p>
                </div>
              )}
            </div>
          )}

          {item.category === 'crew' && item.crewDetails && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Crew & Technical Team Requirements
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Total Headcount</div>
                  <div className="text-base font-bold mt-1 text-amber-400">
                    👥{' '}
                    {item.crewDetails.rolesNeeded?.reduce((sum, r) => sum + (r.count || 0), 0) || 0}{' '}
                    Crew
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl border col-span-1 sm:col-span-2 ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs text-slate-400">Shift Timings</div>
                  <div className="text-sm font-bold mt-1">
                    ⏰ {item.crewDetails.shiftStartTime || 'Start'} to{' '}
                    {item.crewDetails.shiftEndTime || 'End'}
                  </div>
                </div>
              </div>

              {item.crewDetails.rolesNeeded && item.crewDetails.rolesNeeded.length > 0 && (
                <div>
                  <div className="text-xs text-slate-400 mb-2 font-medium">Headcount by Role:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.crewDetails.rolesNeeded.map((r, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs ${
                          isDark
                            ? 'bg-slate-950/40 border-slate-800'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="font-medium">{r.role}</span>
                        <span className="px-2 py-0.5 rounded-md font-bold bg-amber-500/20 text-amber-300">
                          {r.count}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-xs">
                <span
                  className={`px-3 py-1.5 rounded-xl border font-medium ${
                    item.crewDetails.mealsProvided
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}
                >
                  {item.crewDetails.mealsProvided ? '✓ Meals Provided' : '✗ Meals Not Provided'}
                </span>
                <span
                  className={`px-3 py-1.5 rounded-xl border font-medium ${
                    item.crewDetails.uniformRequired
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}
                >
                  {item.crewDetails.uniformRequired
                    ? '👔 Uniform / All-Black Required'
                    : 'Casual Wear'}
                </span>
                {item.crewDetails.gearPolicy && (
                  <span
                    className={`px-3 py-1.5 rounded-xl border font-medium ${
                      isDark
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    📦 {item.crewDetails.gearPolicy}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Host Contact Details */}
          <div
            className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Host Contact Information
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Contact Person:</span>
                <div className="font-semibold">{item.contact?.name || 'Anonymous'}</div>
              </div>
              <div>
                <span className="text-slate-400">Email:</span>
                <div>
                  <a
                    href={`mailto:${item.contact?.email}`}
                    className="font-medium text-orange-400 hover:underline"
                  >
                    {item.contact?.email || 'N/A'}
                  </a>
                </div>
              </div>
              <div>
                <span className="text-slate-400">Phone:</span>
                <div>
                  <a
                    href={`tel:${item.contact?.phone}`}
                    className="font-medium text-orange-400 hover:underline"
                  >
                    {item.contact?.phone || 'N/A'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Database Meta */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/50">
            <div>
              <span>MongoDB ID: </span>
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                {item._id}
              </code>
            </div>
            <div>
              Posted on {new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-end ${
            isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
            }`}
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
}
