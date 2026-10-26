'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Mic2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { IRequirementFormData } from '@/types/requirement';

interface EventPreviewCardProps {
  formData: IRequirementFormData;
  theme?: 'dark' | 'light';
}

export const EventPreviewCard: React.FC<EventPreviewCardProps> = ({
  formData,
  theme = 'dark',
}) => {
  const { category, eventName, eventType, startDate, endDate, dateType, location, venue } = formData;
  const isDark = theme === 'dark';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryConfig = () => {
    switch (category) {
      case 'planner':
        return {
          title: 'Event Planner',
          icon: Sparkles,
          gradient: 'from-amber-500 to-orange-500',
          badgeText: 'Planning & Design Brief',
        };
      case 'performer':
        return {
          title: 'Performer / Artist',
          icon: Mic2,
          gradient: 'from-purple-500 to-pink-500',
          badgeText: 'Stage Performance Brief',
        };
      case 'crew':
        return {
          title: 'Event Crew & Staff',
          icon: Users,
          gradient: 'from-blue-500 to-cyan-500',
          badgeText: 'Technical Operations Brief',
        };
      default:
        return {
          title: 'Event Requirement',
          icon: Sparkles,
          gradient: 'from-orange-500 to-amber-500',
          badgeText: 'Event Brief',
        };
    }
  };

  const config = getCategoryConfig();
  const Icon = config.icon;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Live Preview Label Header */}
      <div className="flex items-center justify-between px-1">
        <span className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span>Live Requirement Ticket</span>
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
          isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          Real-Time Preview
        </span>
      </div>

      {/* The Ticket Card */}
      <div className={`relative rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90 shadow-slate-200/60'
      }`}>
        {/* Top Header Banner with Category Gradient */}
        <div className={`p-4 bg-gradient-to-r ${config.gradient} text-white flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-black/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider">{config.title}</div>
              <div className="text-[10px] text-white/80">{config.badgeText}</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase tracking-widest">
            GoPratle
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Title & Format */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 flex-wrap gap-1">
              {eventType ? (
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {eventType}
                </span>
              ) : (
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold italic ${
                  isDark ? 'bg-slate-800/60 text-slate-500' : 'bg-slate-100 text-slate-400'
                }`}>
                  Select Event Type...
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Active Draft
              </span>
            </div>

            <h3 className={`text-lg sm:text-xl font-bold tracking-tight leading-snug line-clamp-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {eventName || 'Your Event Title Will Appear Here'}
            </h3>
          </div>

          {/* Dates & Location Grid */}
          <div className={`grid grid-cols-1 gap-2.5 pt-2 border-t text-xs ${
            isDark ? 'border-slate-800/80 text-slate-300' : 'border-slate-100 text-slate-600'
          }`}>
            {/* Schedule */}
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
              <span>
                {startDate ? (
                  dateType === 'range' && endDate ? (
                    `${formatDate(startDate)} — ${formatDate(endDate)}`
                  ) : (
                    formatDate(startDate)
                  )
                ) : (
                  <span className="text-slate-400 italic">Event Date not set yet</span>
                )}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>
                {location?.city ? (
                  `${location.city}${location.state ? `, ${location.state}` : ''}`
                ) : (
                  <span className="text-slate-400 italic">Location not specified</span>
                )}
              </span>
            </div>

            {/* Venue (if entered) */}
            {venue && (
              <div className="flex items-center space-x-2.5">
                <Building2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{venue}</span>
              </div>
            )}
          </div>

          {/* Category-Specific Preview Attributes */}
          <div className={`p-3.5 rounded-2xl border space-y-2 ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[11px] font-bold uppercase tracking-wider flex items-center justify-between ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span>Category Snapshot</span>
              <span className="capitalize text-orange-500 font-bold">{category}</span>
            </div>

            {category === 'planner' && (
              <div className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Guest Count:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formData.plannerDetails?.guestCount ? `${formData.plannerDetails.guestCount} Guests` : 'TBD in Step 2'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Budget Range:</span>
                  <span className="font-semibold text-emerald-500">
                    {formData.plannerDetails?.budgetMax ? `₹${(formData.plannerDetails.budgetMin / 100000).toFixed(1)}L - ₹${(formData.plannerDetails.budgetMax / 100000).toFixed(1)}L` : 'TBD in Step 2'}
                  </span>
                </div>
              </div>
            )}

            {category === 'performer' && (
              <div className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Artist Type:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formData.performerDetails?.performanceType || 'TBD in Step 2'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Duration:</span>
                  <span className="font-semibold text-purple-500">
                    {formData.performerDetails?.durationHours ? `${formData.performerDetails.durationHours} Hours` : 'TBD in Step 2'}
                  </span>
                </div>
              </div>
            )}

            {category === 'crew' && (
              <div className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Roles Needed:</span>
                  <span className="font-semibold text-blue-500">
                    {formData.crewDetails?.rolesNeeded?.length ? `${formData.crewDetails.rolesNeeded.reduce((acc, r) => acc + r.count, 0)} Total Crew` : 'TBD in Step 2'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Shift Timings:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formData.crewDetails?.shiftStartTime ? `${formData.crewDetails.shiftStartTime} - ${formData.crewDetails.shiftEndTime}` : 'TBD in Step 3'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dribbble Style Barcode Ticket Stub */}
          <div className={`pt-3 border-t border-dashed flex items-center justify-between text-[11px] ${
            isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center space-x-1.5 text-emerald-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Host Protected</span>
            </div>
            <span className="font-mono tracking-widest text-slate-400">GP-REQ-2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
