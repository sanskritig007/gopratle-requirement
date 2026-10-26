'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Building2,
  Sparkles,
  Mic2,
  Users,
  Edit2,
  User,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { IRequirementFormData } from '@/types/requirement';
import { getInputStyles, getSectionStyles } from '@/lib/styles';

interface ReviewSummaryProps {
  formData: IRequirementFormData;
  updateFormData: (data: Partial<IRequirementFormData>) => void;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  onJumpToStep: (step: number) => void;
  isSubmitting: boolean;
  submitError?: string | null;
  theme?: 'dark' | 'light';
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  formData,
  updateFormData,
  onSubmit,
  onBack,
  onJumpToStep,
  isSubmitting,
  submitError,
  theme = 'dark',
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const isDark = theme === 'dark';

  const { category, eventName, eventType, startDate, endDate, dateType, location, venue, contact } = formData;

  const validateContact = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!contact?.name || contact.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact?.email || !emailRegex.test(contact.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!contact?.phone || contact.phone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid phone/WhatsApp number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContact()) {
      await onSubmit();
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Not set';
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className={`border-b pb-6 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-3">
          <span>Step 4 of 4</span>
          <span>•</span>
          <span>Final Review & Submission</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Review Your Requirement Brief
        </h2>
        <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Double-check your event specifications below. Click any section's edit button if you need to make changes before publishing.
        </p>
      </div>

      {/* SECTION 1: Event Basics Summary Card */}
      <div className={`p-5 rounded-2xl border space-y-3 ${getSectionStyles(isDark)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Event Basics & Target Category
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="flex items-center space-x-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div>
            <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Event Title:</span>
            <div className={`font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{eventName}</div>
          </div>

          <div>
            <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Category & Format:</span>
            <div className={`font-semibold mt-0.5 capitalize flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="text-orange-500">{category}</span>
              <span>•</span>
              <span>{eventType}</span>
            </div>
          </div>

          <div>
            <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Schedule:</span>
            <div className={`font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {dateType === 'range' && endDate
                ? `${formatDate(startDate)} — ${formatDate(endDate)}`
                : formatDate(startDate)}
            </div>
          </div>

          <div>
            <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Location / Venue:</span>
            <div className={`font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {location.city}, {location.state} {venue ? `(${venue})` : ''}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Category Details Summary Card */}
      <div className={`p-5 rounded-2xl border space-y-3 ${getSectionStyles(isDark)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {category === 'planner' && 'Planner Services & Scope'}
              {category === 'performer' && 'Performance Specifications'}
              {category === 'crew' && 'Crew Headcount & Roles'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="flex items-center space-x-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Planner Details */}
        {category === 'planner' && (
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(formData.plannerDetails?.servicesNeeded || []).map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
                  {s}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Attendees:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.plannerDetails?.guestCount} Guests</strong>
              </div>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Budget:</span>{' '}
                <strong className="text-emerald-500">₹{(formData.plannerDetails?.budgetMin || 0).toLocaleString('en-IN')} - ₹{(formData.plannerDetails?.budgetMax || 0).toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Performer Details */}
        {category === 'performer' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Format:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.performerDetails?.performanceType}</strong>
              </div>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Duration:</span>{' '}
                <strong className="text-purple-500">{formData.performerDetails?.durationHours} Hours ({formData.performerDetails?.numberOfSets} Sets)</strong>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(formData.performerDetails?.genres || []).map((g) => (
                <span key={g} className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 border border-purple-500/20 font-medium">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Crew Details */}
        {category === 'crew' && (
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap gap-2 pt-1">
              {(formData.crewDetails?.rolesNeeded || []).map((r) => (
                <span key={r.role} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 font-semibold">
                  {r.role}: <strong>{r.count}</strong>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Logistics Summary Card */}
      <div className={`p-5 rounded-2xl border space-y-3 ${getSectionStyles(isDark)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Logistics & Technical Requirements
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="flex items-center space-x-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="text-xs space-y-1.5 pt-1">
          {category === 'planner' && (
            <>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Theme / Vibe:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.plannerDetails?.themeOrVibe || 'Open to proposals'}</strong>
              </div>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Catering:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.plannerDetails?.cateringPreference}</strong>
              </div>
            </>
          )}

          {category === 'performer' && (
            <>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Sound Policy:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                  {formData.performerDetails?.soundProvidedByHost ? 'Host provides full PA system' : 'Performer gear arrangement'}
                </strong>
              </div>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Audience Crowd Size:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.performerDetails?.audienceSize} Attendees</strong>
              </div>
            </>
          )}

          {category === 'crew' && (
            <>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Shift Hours:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                  {formData.crewDetails?.shiftStartTime} — {formData.crewDetails?.shiftEndTime}
                </strong>
              </div>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Gear Policy:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.crewDetails?.gearPolicy}</strong>
              </div>
              <div>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Meals Provided:</span>{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.crewDetails?.mealsProvided ? 'Yes' : 'No'}</strong>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SECTION 4: Host Contact Information (Crucial for vendor responses) */}
      <form onSubmit={handleSubmit} className="space-y-5 pt-2">
        <div className={`p-5 rounded-2xl border space-y-4 ${getSectionStyles(isDark)}`}>
          <div>
            <h3 className={`text-sm font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <User className="w-4 h-4 text-orange-500" />
              <span>Host Contact Information</span>
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Interested professionals on GoPratle will reach out to you with tailored proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Host Name */}
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Full Name <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => {
                    updateFormData({ contact: { ...contact, name: e.target.value } });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Sanskriti Goswami"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)} ${
                    errors.name ? 'border-rose-500 focus:ring-rose-500/30' : ''
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Host Email */}
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Email Address <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => {
                    updateFormData({ contact: { ...contact, email: e.target.value } });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. sanskriti@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)} ${
                    errors.email ? 'border-rose-500 focus:ring-rose-500/30' : ''
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* Host Phone */}
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Phone / WhatsApp <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => {
                    updateFormData({ contact: { ...contact, phone: e.target.value } });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${getInputStyles(isDark)} ${
                    errors.phone ? 'border-rose-500 focus:ring-rose-500/30' : ''
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Submit Error Banner if API Fails */}
        {submitError && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Bottom Actions */}
        <div className={`pt-6 border-t flex items-center justify-between ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Step 3</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing to MongoDB...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish Requirement</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
