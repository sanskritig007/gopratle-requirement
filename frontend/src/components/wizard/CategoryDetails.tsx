'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Mic2,
  Users,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Plus,
  Minus,
  Check,
  DollarSign,
  Clock,
  Layers,
} from 'lucide-react';
import { IRequirementFormData, ICrewRole } from '@/types/requirement';
import {
  PLANNER_SERVICES,
  PERFORMER_TYPES,
  MUSIC_GENRES,
  CREW_ROLES_OPTIONS,
} from '@/lib/constants';

interface Step2Props {
  formData: IRequirementFormData;
  updateFormData: (data: Partial<IRequirementFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  theme?: 'dark' | 'light';
}

const GUEST_PRESETS = [50, 100, 250, 500, 1000, 2000];
const BUDGET_PRESETS = [
  { label: '₹5L - ₹10L', min: 500000, max: 1000000 },
  { label: '₹15L - ₹25L', min: 1500000, max: 2500000 },
  { label: '₹35L - ₹50L', min: 3500000, max: 5000000 },
  { label: '₹75L - ₹1.5Cr', min: 7500000, max: 15000000 },
];

export const CategoryDetails: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  theme = 'dark',
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [customCrewRole, setCustomCrewRole] = useState('');
  const isDark = theme === 'dark';

  const category = formData.category;

  // Validation based on category
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (category === 'planner') {
      const details = formData.plannerDetails;
      if (!details?.servicesNeeded || details.servicesNeeded.length === 0) {
        newErrors.services = 'Please select at least one required planning service.';
      }
      if (!details?.guestCount || details.guestCount <= 0) {
        newErrors.guestCount = 'Please specify an expected guest count.';
      }
      if (!details?.budgetMax || details.budgetMax <= 0) {
        newErrors.budget = 'Please enter an estimated maximum budget.';
      } else if (details.budgetMin && details.budgetMin > details.budgetMax) {
        newErrors.budget = 'Minimum budget cannot be higher than maximum budget.';
      }
    } else if (category === 'performer') {
      const details = formData.performerDetails;
      if (!details?.performanceType) {
        newErrors.performanceType = 'Please select a performer format.';
      }
      if (!details?.genres || details.genres.length === 0) {
        newErrors.genres = 'Select at least one genre or style.';
      }
      if (!details?.durationHours || details.durationHours <= 0) {
        newErrors.duration = 'Performance duration is required.';
      }
    } else if (category === 'crew') {
      const roles = formData.crewDetails?.rolesNeeded || [];
      const totalCount = roles.reduce((acc, r) => acc + r.count, 0);
      if (roles.length === 0 || totalCount <= 0) {
        newErrors.crewRoles = 'Please add at least one crew role with headcount.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validate()) {
      onNext();
    }
  };

  // Reusable style helpers
  const inputBg = isDark
    ? 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-orange-500/20'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-orange-500/20 shadow-xs';

  const sectionBg = isDark
    ? 'bg-slate-900/40 border-slate-800/80'
    : 'bg-slate-50/90 border-slate-200/90 shadow-xs';

  // Format INR nicely
  const formatLakhs = (val: number) => {
    if (!val) return '₹0';
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} Lakhs`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className={`border-b pb-6 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-3">
          <span>Step 2 of 4</span>
          <span>•</span>
          <span className="capitalize">{category} Specifications</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {category === 'planner' && 'Planner Scope & Investment Scale'}
          {category === 'performer' && 'Stage Performance & Genre Specs'}
          {category === 'crew' && 'On-Ground Crew Roles & Headcounts'}
        </h2>
        <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {category === 'planner' && 'Select the services you need, your expected attendee headcount, and budget target.'}
          {category === 'performer' && 'Specify the entertainment format, performance duration, and musical genres for your event.'}
          {category === 'crew' && 'Configure the exact technical staff and on-ground personnel needed for seamless event execution.'}
        </p>
      </div>

      {/* ======================================================== */}
      {/* 1. PLANNER SPECIFIC FIELDS */}
      {/* ======================================================== */}
      {category === 'planner' && (
        <div className="space-y-6">
          {/* Services Needed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <span>Services Required</span>
                <span className="text-orange-500">*</span>
              </label>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {(formData.plannerDetails?.servicesNeeded?.length || 0)} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PLANNER_SERVICES.map((service) => {
                const selected = formData.plannerDetails?.servicesNeeded?.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => {
                      const current = formData.plannerDetails?.servicesNeeded || [];
                      const updated = selected
                        ? current.filter((s) => s !== service)
                        : [...current, service];
                      updateFormData({
                        plannerDetails: {
                          ...formData.plannerDetails,
                          servicesNeeded: updated,
                          guestCount: formData.plannerDetails?.guestCount || 100,
                          budgetMin: formData.plannerDetails?.budgetMin || 500000,
                          budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                          currency: 'INR',
                        },
                      });
                      if (errors.services) setErrors({ ...errors, services: '' });
                    }}
                    className={`p-3 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-all ${
                      selected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : isDark
                        ? 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <span>{service}</span>
                    {selected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 opacity-40" />}
                  </button>
                );
              })}
            </div>
            {errors.services && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.services}</span>
              </p>
            )}
          </div>

          {/* Guest Count */}
          <div className={`p-5 rounded-2xl border space-y-4 ${sectionBg}`}>
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <span>Expected Guest Count</span>
                <span className="text-orange-500">*</span>
              </label>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Approximate number of attendees for venue sizing and catering estimation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {GUEST_PRESETS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                        guestCount: count,
                        budgetMin: formData.plannerDetails?.budgetMin || 500000,
                        budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                        currency: 'INR',
                      },
                    });
                    if (errors.guestCount) setErrors({ ...errors, guestCount: '' });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    formData.plannerDetails?.guestCount === count
                      ? 'bg-orange-500 text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {count}+ Guests
                </button>
              ))}
            </div>

            <div className="max-w-xs">
              <input
                type="number"
                min="1"
                value={formData.plannerDetails?.guestCount || ''}
                onChange={(e) => {
                  updateFormData({
                    plannerDetails: {
                      ...formData.plannerDetails,
                      servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                      guestCount: parseInt(e.target.value) || 0,
                      budgetMin: formData.plannerDetails?.budgetMin || 500000,
                      budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                      currency: 'INR',
                    },
                  });
                  if (errors.guestCount) setErrors({ ...errors, guestCount: '' });
                }}
                placeholder="Or type custom count e.g. 350"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
              />
            </div>
            {errors.guestCount && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.guestCount}</span>
              </p>
            )}
          </div>

          {/* Budget Range */}
          <div className={`p-5 rounded-2xl border space-y-4 ${sectionBg}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <span>Estimated Budget Range (INR)</span>
                  <span className="text-orange-500">*</span>
                </label>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Help planners propose packages matching your scale.
                </p>
              </div>

              {formData.plannerDetails?.budgetMax ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {formatLakhs(formData.plannerDetails.budgetMin || 0)} — {formatLakhs(formData.plannerDetails.budgetMax)}
                </span>
              ) : null}
            </div>

            {/* Quick Budget Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {BUDGET_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                        guestCount: formData.plannerDetails?.guestCount || 100,
                        budgetMin: preset.min,
                        budgetMax: preset.max,
                        currency: 'INR',
                      },
                    });
                    if (errors.budget) setErrors({ ...errors, budget: '' });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    formData.plannerDetails?.budgetMax === preset.max
                      ? 'bg-orange-500 text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Min & Max Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Minimum Target (₹)
                </span>
                <input
                  type="number"
                  step="50000"
                  value={formData.plannerDetails?.budgetMin || ''}
                  onChange={(e) =>
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                        guestCount: formData.plannerDetails?.guestCount || 100,
                        budgetMin: parseInt(e.target.value) || 0,
                        budgetMax: formData.plannerDetails?.budgetMax || 1000000,
                        currency: 'INR',
                      },
                    })
                  }
                  placeholder="e.g. 500000"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
                />
              </div>

              <div className="space-y-1">
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Maximum Ceiling (₹) <span className="text-orange-500">*</span>
                </span>
                <input
                  type="number"
                  step="50000"
                  value={formData.plannerDetails?.budgetMax || ''}
                  onChange={(e) => {
                    updateFormData({
                      plannerDetails: {
                        ...formData.plannerDetails,
                        servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                        guestCount: formData.plannerDetails?.guestCount || 100,
                        budgetMin: formData.plannerDetails?.budgetMin || 0,
                        budgetMax: parseInt(e.target.value) || 0,
                        currency: 'INR',
                      },
                    });
                    if (errors.budget) setErrors({ ...errors, budget: '' });
                  }}
                  placeholder="e.g. 1500000"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
                />
              </div>
            </div>
            {errors.budget && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.budget}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PERFORMER SPECIFIC FIELDS */}
      {/* ======================================================== */}
      {category === 'performer' && (
        <div className="space-y-6">
          {/* Performer Type Selection */}
          <div className="space-y-3">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>Artist / Performance Format</span>
              <span className="text-orange-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PERFORMER_TYPES.map((type) => {
                const selected = formData.performerDetails?.performanceType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      updateFormData({
                        performerDetails: {
                          ...formData.performerDetails,
                          performanceType: type,
                          genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                          durationHours: formData.performerDetails?.durationHours || 2,
                          numberOfSets: formData.performerDetails?.numberOfSets || 1,
                          soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                        },
                      });
                      if (errors.performanceType) setErrors({ ...errors, performanceType: '' });
                    }}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all ${
                      selected
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                        : isDark
                        ? 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>
            {errors.performanceType && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.performanceType}</span>
              </p>
            )}
          </div>

          {/* Music Genres Selection */}
          <div className={`p-5 rounded-2xl border space-y-3 ${sectionBg}`}>
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>Preferred Genres / Style</span>
              <span className="text-orange-500">*</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {MUSIC_GENRES.map((genre) => {
                const selected = formData.performerDetails?.genres?.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      const current = formData.performerDetails?.genres || [];
                      const updated = selected
                        ? current.filter((g) => g !== genre)
                        : [...current, genre];
                      updateFormData({
                        performerDetails: {
                          ...formData.performerDetails,
                          performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                          genres: updated,
                          durationHours: formData.performerDetails?.durationHours || 2,
                          numberOfSets: formData.performerDetails?.numberOfSets || 1,
                          soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                        },
                      });
                      if (errors.genres) setErrors({ ...errors, genres: '' });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
            {errors.genres && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.genres}</span>
              </p>
            )}
          </div>

          {/* Duration & Sets */}
          <div className={`p-5 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 gap-4 ${sectionBg}`}>
            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Performance Duration (Hours)</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={formData.performerDetails?.durationHours || ''}
                onChange={(e) => {
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                      genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                      durationHours: parseFloat(e.target.value) || 0,
                      numberOfSets: formData.performerDetails?.numberOfSets || 1,
                      soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                    },
                  });
                  if (errors.duration) setErrors({ ...errors, duration: '' });
                }}
                placeholder="e.g. 2.5"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
              />
              {errors.duration && <p className="text-xs text-rose-500 mt-1">{errors.duration}</p>}
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Number of Sets
              </label>
              <select
                value={formData.performerDetails?.numberOfSets || 1}
                onChange={(e) =>
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                      genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                      durationHours: formData.performerDetails?.durationHours || 2,
                      numberOfSets: parseInt(e.target.value) || 1,
                      soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                    },
                  })
                }
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${inputBg}`}
              >
                <option value={1}>1 Set (Continuous)</option>
                <option value={2}>2 Sets (With 15 min break)</option>
                <option value={3}>3 Sets (Festival style)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CREW SPECIFIC FIELDS */}
      {/* ======================================================== */}
      {category === 'crew' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <span>Staffing Roles & Quantity</span>
                <span className="text-orange-500">*</span>
              </label>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Specify how many professionals you need for each on-ground operational role.
              </p>
            </div>

            {/* Total Headcount Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              Total: {(formData.crewDetails?.rolesNeeded || []).reduce((acc, r) => acc + r.count, 0)} Crew Members
            </span>
          </div>

          {/* Role Manager List */}
          <div className="space-y-2.5">
            {CREW_ROLES_OPTIONS.map((roleName) => {
              const currentRoles = formData.crewDetails?.rolesNeeded || [];
              const matched = currentRoles.find((r) => r.role === roleName);
              const count = matched?.count || 0;

              const updateCount = (newCount: number) => {
                let updatedRoles: ICrewRole[] = [];
                if (newCount <= 0) {
                  updatedRoles = currentRoles.filter((r) => r.role !== roleName);
                } else if (matched) {
                  updatedRoles = currentRoles.map((r) =>
                    r.role === roleName ? { ...r, count: newCount } : r
                  );
                } else {
                  updatedRoles = [...currentRoles, { role: roleName, count: newCount }];
                }

                updateFormData({
                  crewDetails: {
                    ...formData.crewDetails,
                    rolesNeeded: updatedRoles,
                    shiftStartTime: formData.crewDetails?.shiftStartTime || '09:00 AM',
                    shiftEndTime: formData.crewDetails?.shiftEndTime || '06:00 PM',
                    gearPolicy: formData.crewDetails?.gearPolicy || 'Crew Must Bring Own Equipment',
                    uniformRequired: formData.crewDetails?.uniformRequired || false,
                    mealsProvided: formData.crewDetails?.mealsProvided ?? true,
                  },
                });
                if (errors.crewRoles) setErrors({ ...errors, crewRoles: '' });
              };

              return (
                <div
                  key={roleName}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    count > 0
                      ? isDark
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-blue-50 border-blue-200'
                      : isDark
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div>
                    <span className={`text-xs font-semibold ${count > 0 ? (isDark ? 'text-white' : 'text-blue-950') : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                      {roleName}
                    </span>
                    {count > 0 && (
                      <span className="ml-2 text-[11px] font-bold text-blue-500">
                        ({count} {count === 1 ? 'person' : 'personnel'})
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={count === 0}
                      onClick={() => updateCount(count - 1)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        count === 0
                          ? 'opacity-30 cursor-not-allowed'
                          : isDark
                          ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className={`w-8 text-center text-xs font-bold ${count > 0 ? 'text-blue-500' : (isDark ? 'text-slate-500' : 'text-slate-400')}`}>
                      {count}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateCount(count + 1)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        count > 0
                          ? 'bg-blue-600 text-white'
                          : isDark
                          ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Custom Role Input */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="text"
              value={customCrewRole}
              onChange={(e) => setCustomCrewRole(e.target.value)}
              placeholder="Add other custom role (e.g. Drone Pilot, VIP Hostess)..."
              className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${inputBg}`}
            />
            <button
              type="button"
              onClick={() => {
                if (customCrewRole.trim()) {
                  const currentRoles = formData.crewDetails?.rolesNeeded || [];
                  updateFormData({
                    crewDetails: {
                      ...formData.crewDetails,
                      rolesNeeded: [...currentRoles, { role: customCrewRole.trim(), count: 1 }],
                      shiftStartTime: formData.crewDetails?.shiftStartTime || '09:00 AM',
                      shiftEndTime: formData.crewDetails?.shiftEndTime || '06:00 PM',
                      gearPolicy: formData.crewDetails?.gearPolicy || 'Crew Must Bring Own Equipment',
                      uniformRequired: formData.crewDetails?.uniformRequired || false,
                      mealsProvided: formData.crewDetails?.mealsProvided ?? true,
                    },
                  });
                  setCustomCrewRole('');
                  if (errors.crewRoles) setErrors({ ...errors, crewRoles: '' });
                }
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Add Role
            </button>
          </div>
          {errors.crewRoles && (
            <p className="text-xs text-rose-500 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.crewRoles}</span>
            </p>
          )}
        </div>
      )}

      {/* Navigation Bar (Back & Next) */}
      <div className={`pt-6 border-t flex items-center justify-between ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <button
          type="button"
          onClick={onBack}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            isDark ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 1</span>
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Continue to Step 3</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
