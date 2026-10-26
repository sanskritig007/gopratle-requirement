'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Mic2,
  Users,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Volume2,
  Clock,
  Utensils,
  Palette,
  Shield,
  Shirt,
  Coffee,
  Check,
} from 'lucide-react';
import { IRequirementFormData } from '@/types/requirement';
import {
  THEME_VIBES_OPTIONS,
  CATERING_OPTIONS,
  SOUND_POLICIES,
  GEAR_POLICIES,
  AUDIENCE_PRESETS,
} from '@/lib/constants';
import { getInputStyles, getSectionStyles } from '@/lib/styles';

interface Step3Props {
  formData: IRequirementFormData;
  updateFormData: (data: Partial<IRequirementFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  theme?: 'dark' | 'light';
}

export const EventLogistics: React.FC<Step3Props> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  theme = 'dark',
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isDark = theme === 'dark';
  const category = formData.category;

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (category === 'planner') {
      if (!formData.plannerDetails?.cateringPreference) {
        newErrors.catering = 'Please select a catering preference.';
      }
    } else if (category === 'performer') {
      if (!formData.performerDetails?.audienceSize || formData.performerDetails.audienceSize <= 0) {
        newErrors.audienceSize = 'Please specify expected audience crowd size.';
      }
    } else if (category === 'crew') {
      if (!formData.crewDetails?.shiftStartTime || !formData.crewDetails?.shiftEndTime) {
        newErrors.shiftTimings = 'Shift start time and end time are required.';
      }
      if (!formData.crewDetails?.gearPolicy) {
        newErrors.gearPolicy = 'Please select an equipment/gear policy.';
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className={`border-b pb-6 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-3">
          <span>Step 3 of 4</span>
          <span>•</span>
          <span className="capitalize">{category} Logistics & Technicals</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {category === 'planner' && 'Theme, Catering & Planning Vision'}
          {category === 'performer' && 'Stage Setup, Sound & Crowd Scale'}
          {category === 'crew' && 'Shift Schedule, Gear Policy & Logistics'}
        </h2>
        <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {category === 'planner' && 'Define the visual vibe, food & hospitality preferences, and multi-venue special requirements.'}
          {category === 'performer' && 'Establish sound/PA provisions, stage dimensions, audience size, and performance cues.'}
          {category === 'crew' && 'Set precise shift hours, equipment ownership rules, on-site meal policies, and reporting details.'}
        </p>
      </div>

      {/* ======================================================== */}
      {/* 1. PLANNER SPECIFIC FIELDS */}
      {/* ======================================================== */}
      {category === 'planner' && (
        <div className="space-y-6">
          {/* Theme & Vibe Selection */}
          <div className={`p-5 rounded-2xl border space-y-3 ${getSectionStyles(isDark)}`}>
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Palette className="w-4 h-4 text-orange-500" />
                <span>Event Theme / Aesthetic Vibe</span>
              </label>
              <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Optional</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {THEME_VIBES_OPTIONS.map((vibe) => {
                const selected = formData.plannerDetails?.themeOrVibe === vibe;
                return (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() =>
                      updateFormData({
                        plannerDetails: {
                          ...formData.plannerDetails,
                          servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                          guestCount: formData.plannerDetails?.guestCount || 100,
                          budgetMin: formData.plannerDetails?.budgetMin || 500000,
                          budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                          currency: 'INR',
                          themeOrVibe: vibe,
                        },
                      })
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={formData.plannerDetails?.themeOrVibe || ''}
              onChange={(e) =>
                updateFormData({
                  plannerDetails: {
                    ...formData.plannerDetails,
                    servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                    guestCount: formData.plannerDetails?.guestCount || 100,
                    budgetMin: formData.plannerDetails?.budgetMin || 500000,
                    budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                    currency: 'INR',
                    themeOrVibe: e.target.value,
                  },
                })
              }
              placeholder="Or type custom theme vision (e.g. Pastel Rajputana with fairy light canopy)..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)}`}
            />
          </div>

          {/* Catering Preference */}
          <div className="space-y-3">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Utensils className="w-4 h-4 text-orange-500" />
              <span>Catering & Food Service Preference</span>
              <span className="text-orange-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATERING_OPTIONS.map((opt) => {
                const selected = formData.plannerDetails?.cateringPreference === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      updateFormData({
                        plannerDetails: {
                          ...formData.plannerDetails,
                          servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                          guestCount: formData.plannerDetails?.guestCount || 100,
                          budgetMin: formData.plannerDetails?.budgetMin || 500000,
                          budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                          currency: 'INR',
                          cateringPreference: opt,
                        },
                      });
                      if (errors.catering) setErrors({ ...errors, catering: '' });
                    }}
                    className={`p-3.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
                      selected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : isDark
                        ? 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <span>{opt}</span>
                    {selected && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
            {errors.catering && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.catering}</span>
              </p>
            )}
          </div>

          {/* Special Instructions Textarea */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center justify-between ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>Special Instructions & Coordination Notes</span>
              <span className={`text-[11px] font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Optional</span>
            </label>
            <textarea
              rows={3}
              value={formData.plannerDetails?.specialInstructions || ''}
              onChange={(e) =>
                updateFormData({
                  plannerDetails: {
                    ...formData.plannerDetails,
                    servicesNeeded: formData.plannerDetails?.servicesNeeded || ['Full Event Planning & Execution'],
                    guestCount: formData.plannerDetails?.guestCount || 100,
                    budgetMin: formData.plannerDetails?.budgetMin || 500000,
                    budgetMax: formData.plannerDetails?.budgetMax || 1500000,
                    currency: 'INR',
                    specialInstructions: e.target.value,
                  },
                })
              }
              placeholder="e.g. VIP guest airport transfers needed over 3 days. Sangeet and Wedding are at two different venues..."
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 resize-none ${getInputStyles(isDark)}`}
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PERFORMER SPECIFIC FIELDS */}
      {/* ======================================================== */}
      {category === 'performer' && (
        <div className="space-y-6">
          {/* Sound / PA System Policy */}
          <div className="space-y-3">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Volume2 className="w-4 h-4 text-orange-500" />
              <span>Sound & PA System Provision</span>
              <span className="text-orange-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SOUND_POLICIES.map((policy) => {
                const isProvided = policy.startsWith('Host');
                const selected =
                  (isProvided && formData.performerDetails?.soundProvidedByHost === true) ||
                  (!isProvided && formData.performerDetails?.soundProvidedByHost === false && formData.performerDetails?.specialRequests?.includes(policy));

                return (
                  <button
                    key={policy}
                    type="button"
                    onClick={() => {
                      updateFormData({
                        performerDetails: {
                          ...formData.performerDetails,
                          performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                          genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                          durationHours: formData.performerDetails?.durationHours || 2,
                          numberOfSets: formData.performerDetails?.numberOfSets || 1,
                          soundProvidedByHost: isProvided,
                          specialRequests: formData.performerDetails?.specialRequests || policy,
                        },
                      });
                    }}
                    className={`p-4 rounded-2xl text-xs font-semibold text-left flex flex-col justify-between transition-all ${
                      selected
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                        : isDark
                        ? 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <span className="mb-2 leading-relaxed">{policy}</span>
                    <span className="text-[10px] opacity-75 font-normal">
                      {isProvided ? 'Host provides line array & monitors' : 'Artist carries gear or rental required'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expected Crowd Size */}
          <div className={`p-5 rounded-2xl border space-y-3 ${getSectionStyles(isDark)}`}>
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Users className="w-4 h-4 text-orange-500" />
              <span>Expected Audience / Crowd Size</span>
              <span className="text-orange-500">*</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {AUDIENCE_PRESETS.map((preset) => {
                const num = parseInt(preset.split('-')[1]?.replace(/\D/g, '') || preset.replace(/\D/g, '')) || 250;
                const selected = formData.performerDetails?.audienceSize === num;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      updateFormData({
                        performerDetails: {
                          ...formData.performerDetails,
                          performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                          genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                          durationHours: formData.performerDetails?.durationHours || 2,
                          numberOfSets: formData.performerDetails?.numberOfSets || 1,
                          soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                          audienceSize: num,
                        },
                      });
                      if (errors.audienceSize) setErrors({ ...errors, audienceSize: '' });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-purple-600 text-white shadow-xs'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>

            <div className="max-w-xs pt-1">
              <input
                type="number"
                min="10"
                value={formData.performerDetails?.audienceSize || ''}
                onChange={(e) => {
                  updateFormData({
                    performerDetails: {
                      ...formData.performerDetails,
                      performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                      genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                      durationHours: formData.performerDetails?.durationHours || 2,
                      numberOfSets: formData.performerDetails?.numberOfSets || 1,
                      soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                      audienceSize: parseInt(e.target.value) || 0,
                    },
                  });
                  if (errors.audienceSize) setErrors({ ...errors, audienceSize: '' });
                }}
                placeholder="Or type exact crowd size (e.g. 850)..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)}`}
              />
            </div>
            {errors.audienceSize && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.audienceSize}</span>
              </p>
            )}
          </div>

          {/* Stage & Lighting Specs */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center justify-between ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>Stage Dimensions & Technical Specifications</span>
              <span className={`text-[11px] font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Optional</span>
            </label>
            <input
              type="text"
              value={formData.performerDetails?.stageSpecifications || ''}
              onChange={(e) =>
                updateFormData({
                  performerDetails: {
                    ...formData.performerDetails,
                    performanceType: formData.performerDetails?.performanceType || 'Electronic DJ / Club DJ',
                    genres: formData.performerDetails?.genres || ['Bollywood Commercial'],
                    durationHours: formData.performerDetails?.durationHours || 2,
                    numberOfSets: formData.performerDetails?.numberOfSets || 1,
                    soundProvidedByHost: formData.performerDetails?.soundProvidedByHost || false,
                    stageSpecifications: e.target.value,
                  },
                })
              }
              placeholder="e.g. Pioneer CDJ 3000 setup, 2 floor audio monitors, CO2 jets, wireless Sennheiser mic..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)}`}
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CREW SPECIFIC FIELDS */}
      {/* ======================================================== */}
      {category === 'crew' && (
        <div className="space-y-6">
          {/* Shift Timings */}
          <div className={`p-5 rounded-2xl border space-y-4 ${getSectionStyles(isDark)}`}>
            <div>
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Shift Schedule & On-Ground Hours</span>
                <span className="text-orange-500">*</span>
              </label>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Technical and security crews calculate hourly shift billing based on reporting and wrap-up times.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Reporting / Shift Start Time
                </span>
                <input
                  type="text"
                  value={formData.crewDetails?.shiftStartTime || ''}
                  onChange={(e) => {
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        rolesNeeded: formData.crewDetails?.rolesNeeded || [],
                        shiftStartTime: e.target.value,
                        shiftEndTime: formData.crewDetails?.shiftEndTime || '07:00 PM',
                        gearPolicy: formData.crewDetails?.gearPolicy || 'Crew Must Bring Own Equipment',
                        uniformRequired: formData.crewDetails?.uniformRequired || false,
                        mealsProvided: formData.crewDetails?.mealsProvided ?? true,
                      },
                    });
                    if (errors.shiftTimings) setErrors({ ...errors, shiftTimings: '' });
                  }}
                  placeholder="e.g. 08:30 AM"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)}`}
                />
              </div>

              <div className="space-y-1">
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Wrap-Up / Shift End Time
                </span>
                <input
                  type="text"
                  value={formData.crewDetails?.shiftEndTime || ''}
                  onChange={(e) => {
                    updateFormData({
                      crewDetails: {
                        ...formData.crewDetails,
                        rolesNeeded: formData.crewDetails?.rolesNeeded || [],
                        shiftStartTime: formData.crewDetails?.shiftStartTime || '09:00 AM',
                        shiftEndTime: e.target.value,
                        gearPolicy: formData.crewDetails?.gearPolicy || 'Crew Must Bring Own Equipment',
                        uniformRequired: formData.crewDetails?.uniformRequired || false,
                        mealsProvided: formData.crewDetails?.mealsProvided ?? true,
                      },
                    });
                    if (errors.shiftTimings) setErrors({ ...errors, shiftTimings: '' });
                  }}
                  placeholder="e.g. 06:30 PM"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)}`}
                />
              </div>
            </div>
            {errors.shiftTimings && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.shiftTimings}</span>
              </p>
            )}
          </div>

          {/* Equipment & Gear Policy */}
          <div className="space-y-3">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <Shield className="w-4 h-4 text-orange-500" />
              <span>Equipment & Gear Policy</span>
              <span className="text-orange-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {GEAR_POLICIES.map((policy) => {
                const selected = formData.crewDetails?.gearPolicy === policy;
                return (
                  <button
                    key={policy}
                    type="button"
                    onClick={() => {
                      updateFormData({
                        crewDetails: {
                          ...formData.crewDetails,
                          rolesNeeded: formData.crewDetails?.rolesNeeded || [],
                          shiftStartTime: formData.crewDetails?.shiftStartTime || '09:00 AM',
                          shiftEndTime: formData.crewDetails?.shiftEndTime || '06:00 PM',
                          gearPolicy: policy,
                          uniformRequired: formData.crewDetails?.uniformRequired || false,
                          mealsProvided: formData.crewDetails?.mealsProvided ?? true,
                        },
                      });
                      if (errors.gearPolicy) setErrors({ ...errors, gearPolicy: '' });
                    }}
                    className={`p-3.5 rounded-2xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
                      selected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                        : isDark
                        ? 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <span>{policy}</span>
                    {selected && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
            {errors.gearPolicy && (
              <p className="text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gearPolicy}</span>
              </p>
            )}
          </div>

          {/* Hospitality & Dress Code Toggles */}
          <div className={`p-5 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 gap-4 ${getSectionStyles(isDark)}`}>
            {/* Meals Provided Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center space-x-2.5">
                <Coffee className="w-4 h-4 text-orange-500" />
                <div>
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Meals Provided on Site
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Lunch / Dinner arrangements for crew
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateFormData({
                    crewDetails: {
                      ...formData.crewDetails,
                      rolesNeeded: formData.crewDetails?.rolesNeeded || [],
                      shiftStartTime: formData.crewDetails?.shiftStartTime || '09:00 AM',
                      shiftEndTime: formData.crewDetails?.shiftEndTime || '06:00 PM',
                      gearPolicy: formData.crewDetails?.gearPolicy || 'Crew Must Bring Own Equipment',
                      uniformRequired: formData.crewDetails?.uniformRequired || false,
                      mealsProvided: !(formData.crewDetails?.mealsProvided ?? true),
                    },
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  (formData.crewDetails?.mealsProvided ?? true) ? 'bg-orange-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                    (formData.crewDetails?.mealsProvided ?? true) ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Uniform Required Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center space-x-2.5">
                <Shirt className="w-4 h-4 text-blue-500" />
                <div>
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Dress Code / All-Black
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Mandatory production uniform
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateFormData({
                    crewDetails: {
                      ...formData.crewDetails,
                      rolesNeeded: formData.crewDetails?.rolesNeeded || [],
                      shiftStartTime: formData.crewDetails?.shiftStartTime || '09:00 AM',
                      shiftEndTime: formData.crewDetails?.shiftEndTime || '06:00 PM',
                      gearPolicy: formData.crewDetails?.gearPolicy || 'Crew Must Bring Own Equipment',
                      uniformRequired: !formData.crewDetails?.uniformRequired,
                      mealsProvided: formData.crewDetails?.mealsProvided ?? true,
                    },
                  })
                }
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.crewDetails?.uniformRequired ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                    formData.crewDetails?.uniformRequired ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar (Back to Step 2 & Next to Step 4) */}
      <div className={`pt-6 border-t flex items-center justify-between ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <button
          type="button"
          onClick={onBack}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            isDark ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 2</span>
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Continue to Step 4 (Review)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
