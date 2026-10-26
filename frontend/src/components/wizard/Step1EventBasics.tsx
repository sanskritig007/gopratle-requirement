'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Building2,
  Sparkles,
  Mic2,
  Users,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { IRequirementFormData, CategoryType } from '@/types/requirement';
import { EVENT_TYPES } from '@/lib/constants';

interface Step1Props {
  formData: IRequirementFormData;
  updateFormData: (data: Partial<IRequirementFormData>) => void;
  onNext: () => void;
  theme?: 'dark' | 'light';
}

const QUICK_CITIES = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Delhi NCR', state: 'Delhi' },
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Goa', state: 'Goa' },
  { city: 'Hyderabad', state: 'Telangana' },
];

export const Step1EventBasics: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  onNext,
  theme = 'dark',
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isDark = theme === 'dark';

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.eventName || formData.eventName.trim().length < 3) {
      newErrors.eventName = 'Event name must be at least 3 characters.';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type.';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required.';
    }

    if (formData.dateType === 'range') {
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required for multi-day events.';
      } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date cannot be earlier than start date.';
      }
    }

    if (!formData.location?.city || formData.location.city.trim().length < 2) {
      newErrors.city = 'City is required.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a requirement category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  // Reusable styling helpers
  const inputBg = isDark
    ? 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500/20'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-orange-500/20 shadow-xs';

  const sectionBg = isDark
    ? 'bg-slate-900/40 border-slate-800/80'
    : 'bg-slate-50/90 border-slate-200/90 shadow-xs';

  const cardInactiveBg = isDark
    ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700'
    : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className={`border-b pb-6 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-3">
          <span>Step 1 of 4</span>
          <span>•</span>
          <span>Core Parameters</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Event Basics & Category
        </h2>
        <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Provide your event foundation. Your category selection will dynamically customize the subsequent steps for planners, performers, or crew.
        </p>
      </div>

      {/* SECTION 1: Event Identity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Name */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>Event Title</span>
              <span className="text-orange-500">*</span>
            </label>
            <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {formData.eventName?.length || 0}/120
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.eventName}
              onChange={(e) => {
                updateFormData({ eventName: e.target.value });
                if (errors.eventName) setErrors({ ...errors, eventName: '' });
              }}
              placeholder="e.g. Royal Wedding of Aarav & Riya, Sunburn Arena Mumbai"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inputBg} ${
                errors.eventName ? 'border-rose-500 focus:ring-rose-500/30' : ''
              }`}
            />
          </div>
          {errors.eventName && (
            <p className="text-xs text-rose-500 flex items-center space-x-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.eventName}</span>
            </p>
          )}
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span>Event Type</span>
            <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.eventType}
              onChange={(e) => {
                updateFormData({ eventType: e.target.value });
                if (errors.eventType) setErrors({ ...errors, eventType: '' });
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${inputBg} ${
                errors.eventType ? 'border-rose-500 focus:ring-rose-500/30' : ''
              }`}
            >
              <option value="" disabled className={isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'}>
                Choose an event format...
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                  {type}
                </option>
              ))}
            </select>
            <div className={`absolute right-4 top-3.5 pointer-events-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ▼
            </div>
          </div>
          {errors.eventType && (
            <p className="text-xs text-rose-500 flex items-center space-x-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.eventType}</span>
            </p>
          )}
        </div>
      </div>

      {/* SECTION 2: Timeline & Dates */}
      <div className={`p-5 rounded-2xl border space-y-4 ${sectionBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className={`text-sm font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <CalendarIcon className="w-4 h-4 text-orange-500" />
              <span>Event Date & Schedule</span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Select whether this is a single-day event or spans across multiple dates.
            </p>
          </div>

          {/* Single Day vs Date Range Toggle */}
          <div className={`flex items-center p-1 rounded-xl border self-start sm:self-auto ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-200/80 border-slate-300'}`}>
            <button
              type="button"
              onClick={() => updateFormData({ dateType: 'single', endDate: undefined })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                formData.dateType === 'single'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Single Day
            </button>
            <button
              type="button"
              onClick={() => updateFormData({ dateType: 'range' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                formData.dateType === 'range'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Day / Range
            </button>
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Start Date */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {formData.dateType === 'single' ? 'Event Date' : 'Start Date'}
              <span className="text-orange-500 ml-1">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate ? formData.startDate.split('T')[0] : ''}
              onChange={(e) => {
                updateFormData({ startDate: e.target.value });
                if (errors.startDate) setErrors({ ...errors, startDate: '' });
              }}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg} ${
                errors.startDate ? 'border-rose-500 focus:ring-rose-500/30' : ''
              }`}
            />
            {errors.startDate && (
              <p className="text-xs text-rose-500 mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* End Date (if range) */}
          {formData.dateType === 'range' && (
            <div className="space-y-1.5 animate-fadeIn">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                End Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                min={formData.startDate ? formData.startDate.split('T')[0] : undefined}
                value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                onChange={(e) => {
                  updateFormData({ endDate: e.target.value });
                  if (errors.endDate) setErrors({ ...errors, endDate: '' });
                }}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg} ${
                  errors.endDate ? 'border-rose-500 focus:ring-rose-500/30' : ''
                }`}
              />
              {errors.endDate && (
                <p className="text-xs text-rose-500 mt-1">{errors.endDate}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Location & Venue */}
      <div className={`p-5 rounded-2xl border space-y-4 ${sectionBg}`}>
        <div>
          <h3 className={`text-sm font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Event Location & Venue</span>
          </h3>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Tell professionals where this event will take place.
          </p>
        </div>

        {/* Quick City Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Quick Pick:</span>
          {QUICK_CITIES.map((c) => (
            <button
              key={c.city}
              type="button"
              onClick={() => {
                updateFormData({
                  location: {
                    ...formData.location,
                    city: c.city,
                    state: c.state,
                  },
                });
                if (errors.city) setErrors({ ...errors, city: '' });
              }}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                formData.location?.city === c.city
                  ? 'bg-orange-500 text-white font-semibold shadow-xs'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-xs'
              }`}
            >
              {c.city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* City */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              City <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location?.city || ''}
              onChange={(e) => {
                updateFormData({
                  location: { ...formData.location, city: e.target.value },
                });
                if (errors.city) setErrors({ ...errors, city: '' });
              }}
              placeholder="e.g. Mumbai, Jaipur, Bengaluru"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg} ${
                errors.city ? 'border-rose-500 focus:ring-rose-500/30' : ''
              }`}
            />
            {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              State / Province
            </label>
            <input
              type="text"
              value={formData.location?.state || ''}
              onChange={(e) =>
                updateFormData({
                  location: { ...formData.location, state: e.target.value },
                })
              }
              placeholder="e.g. Maharashtra, Rajasthan"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
            />
          </div>

          {/* Venue (Optional) */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold flex items-center space-x-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>Venue Name</span>
              <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.venue || ''}
              onChange={(e) => updateFormData({ venue: e.target.value })}
              placeholder="e.g. Grand Hyatt, Jio World Center"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Category Selector (Assignment Hero Feature) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className={`text-base sm:text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Select Requirement Category
              </h3>
              <span className="text-orange-500 font-bold">*</span>
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Choose who you are looking to hire for this event. Steps 2 & 3 will adapt accordingly.
            </p>
          </div>
          {errors.category && (
            <span className="text-xs text-rose-500 font-semibold flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.category}</span>
            </span>
          )}
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Event Planner */}
          <div
            onClick={() => {
              updateFormData({ category: 'planner' });
              if (errors.category) setErrors({ ...errors, category: '' });
            }}
            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              formData.category === 'planner'
                ? isDark
                  ? 'bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-950 border-2 border-amber-500/80 shadow-xl shadow-amber-500/10 scale-[1.02]'
                  : 'bg-gradient-to-b from-amber-50 to-orange-50/50 border-2 border-amber-500 shadow-lg shadow-amber-500/15 scale-[1.02]'
                : cardInactiveBg
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  formData.category === 'planner'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              {formData.category === 'planner' ? (
                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Category A
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
              <h4 className={`text-lg font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Event Planner</span>
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Hire seasoned planners for full-scale event coordination, theme creation, decor design, and vendor orchestration.
              </p>
            </div>

            {/* Feature Pills */}
            <div className={`pt-3 border-t flex flex-wrap gap-1.5 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Decor & Styling
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Guest Hospitality
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Budget Management
              </span>
            </div>
          </div>

          {/* Card 2: Performer / Artist */}
          <div
            onClick={() => {
              updateFormData({ category: 'performer' });
              if (errors.category) setErrors({ ...errors, category: '' });
            }}
            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              formData.category === 'performer'
                ? isDark
                  ? 'bg-gradient-to-b from-purple-500/15 via-slate-900 to-slate-950 border-2 border-purple-500/80 shadow-xl shadow-purple-500/10 scale-[1.02]'
                  : 'bg-gradient-to-b from-purple-50 to-pink-50/50 border-2 border-purple-500 shadow-lg shadow-purple-500/15 scale-[1.02]'
                : cardInactiveBg
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  formData.category === 'performer'
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                    : isDark ? 'bg-slate-800 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}
              >
                <Mic2 className="w-6 h-6" />
              </div>
              {formData.category === 'performer' ? (
                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/40 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Category B
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
              <h4 className={`text-lg font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Performer / Artist</span>
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Book live music bands, solo vocalists, headline DJs, stand-up comedians, emcees, and stage entertainers.
              </p>
            </div>

            {/* Feature Pills */}
            <div className={`pt-3 border-t flex flex-wrap gap-1.5 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Live Bands & DJs
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Stage & Sound
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Set Duration
              </span>
            </div>
          </div>

          {/* Card 3: Crew & Staff */}
          <div
            onClick={() => {
              updateFormData({ category: 'crew' });
              if (errors.category) setErrors({ ...errors, category: '' });
            }}
            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              formData.category === 'crew'
                ? isDark
                  ? 'bg-gradient-to-b from-blue-500/15 via-slate-900 to-slate-950 border-2 border-blue-500/80 shadow-xl shadow-blue-500/10 scale-[1.02]'
                  : 'bg-gradient-to-b from-blue-50 to-cyan-50/50 border-2 border-blue-500 shadow-lg shadow-blue-500/15 scale-[1.02]'
                : cardInactiveBg
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  formData.category === 'crew'
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                    : isDark ? 'bg-slate-800 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}
              >
                <Users className="w-6 h-6" />
              </div>
              {formData.category === 'crew' ? (
                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/40 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Category C
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
              <h4 className={`text-lg font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Event Crew & Staff</span>
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Staff technical crew, photographers, videographers, sound/lighting operators, security bouncers, and ushers.
              </p>
            </div>

            {/* Feature Pills */}
            <div className={`pt-3 border-t flex flex-wrap gap-1.5 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Photographers & Tech
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Headcounts
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                Shift Timings
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Context Banner */}
        {formData.category && (
          <div className={`p-3.5 rounded-xl border flex items-center space-x-3 text-xs animate-fadeIn ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-orange-50/70 border-orange-200 text-slate-700'
          }`}>
            <span className="text-base">💡</span>
            <div>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Adaptive Wizard Active:
              </span>{' '}
              Proceeding as{' '}
              <strong className="text-orange-500 uppercase font-bold">
                {formData.category}
              </strong>
              . In the next steps, you will define category-tailored specifications.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className={`pt-6 border-t flex items-center justify-between ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <p className={`text-xs flex items-center space-x-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          <HelpCircle className="w-3.5 h-3.5" />
          <span>All fields marked with (*) are required</span>
        </p>

        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Continue to Step 2</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
