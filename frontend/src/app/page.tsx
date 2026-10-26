'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { Stepper } from '@/components/wizard/Stepper';
import { EventBasics } from '@/components/wizard/EventBasics';
import { CategoryDetails } from '@/components/wizard/CategoryDetails';
import { EventLogistics } from '@/components/wizard/EventLogistics';
import { ReviewSummary } from '@/components/wizard/ReviewSummary';
import { SubmissionSuccess } from '@/components/wizard/SubmissionSuccess';
import { EventPreviewCard } from '@/components/wizard/EventPreviewCard';
import { RequirementFeed } from '@/components/feed/RequirementFeed';
import { IRequirementFormData, IRequirementItem, CategoryType } from '@/types/requirement';
import { SAMPLE_PRESETS } from '@/lib/constants';
import { createRequirement } from '@/lib/api';

const INITIAL_FORM_DATA: IRequirementFormData = {
  eventName: '',
  eventType: '',
  dateType: 'single',
  startDate: '',
  endDate: undefined,
  location: {
    city: '',
    state: '',
    address: '',
  },
  venue: '',
  category: 'planner',
  contact: {
    name: '',
    email: '',
    phone: '',
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'wizard' | 'feed'>('wizard');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<IRequirementFormData>(INITIAL_FORM_DATA);
  const [feedCount, setFeedCount] = useState<number>(3);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdItem, setCreatedItem] = useState<IRequirementItem | null>(null);

  // Load draft & theme from localStorage
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('gopratle_requirement_draft');
      if (savedDraft) {
        setFormData(JSON.parse(savedDraft));
      }
      const savedTheme = localStorage.getItem('gopratle_theme') as 'dark' | 'light';
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.warn('Could not load preferences from localStorage', e);
    }
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('gopratle_theme', nextTheme);
    } catch (e) {}
  };

  // Save draft on change
  const updateFormData = (updatedFields: Partial<IRequirementFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updatedFields };
      try {
        localStorage.setItem('gopratle_requirement_draft', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Quick fill sample preset for instant testing
  const handleFillSample = (category: CategoryType = 'planner') => {
    const preset = SAMPLE_PRESETS[category];
    if (preset) {
      setFormData(preset);
      try {
        localStorage.setItem('gopratle_requirement_draft', JSON.stringify(preset));
      } catch (e) {}
    }
  };

  // Submit requirement to MongoDB via Express API
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await createRequirement(formData);
      if (res.success && res.data) {
        setCreatedItem(res.data);
        setFeedCount((prev) => prev + 1);
        try {
          localStorage.removeItem('gopratle_requirement_draft');
        } catch (e) {}
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit requirement. Please check your network and inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to post another requirement
  const handlePostAnother = () => {
    setCreatedItem(null);
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark
          ? 'bg-[#090d16] text-slate-100 selection:bg-orange-500/30 selection:text-orange-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-orange-500/20 selection:text-orange-900'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onFillSample={handleFillSample}
        feedCount={feedCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Dribbble Sunset Hero Banner */}
        <HeroBanner
          activeCategory={formData.category}
          onSelectCategory={(cat) => updateFormData({ category: cat })}
        />

        {activeTab === 'wizard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Wizard */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Stepper */}
              <Stepper
                currentStep={currentStep}
                category={formData.category}
                onStepClick={(step) => setCurrentStep(step)}
                theme={theme}
              />

              {/* Form Card Container */}
              <div
                className={`relative rounded-3xl border p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-colors duration-200 ${
                  isDark
                    ? 'bg-slate-950/70 border-slate-800/80 text-white'
                    : 'bg-white border-slate-200/90 text-slate-900 shadow-slate-200/60'
                }`}
              >
                {/* Step 1: Event Basics */}
                {currentStep === 1 && (
                  <EventBasics
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={() => setCurrentStep(2)}
                    theme={theme}
                  />
                )}

                {/* Step 2: Category Details */}
                {currentStep === 2 && (
                  <CategoryDetails
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={() => setCurrentStep(3)}
                    onBack={() => setCurrentStep(1)}
                    theme={theme}
                  />
                )}

                {/* Step 3: Event Logistics */}
                {currentStep === 3 && (
                  <EventLogistics
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={() => setCurrentStep(4)}
                    onBack={() => setCurrentStep(2)}
                    theme={theme}
                  />
                )}

                {/* Step 4: Review & Post to MongoDB */}
                {currentStep === 4 && (
                  createdItem ? (
                    <SubmissionSuccess
                      createdItem={createdItem}
                      onPostAnother={handlePostAnother}
                      onViewFeed={() => setActiveTab('feed')}
                      theme={theme}
                    />
                  ) : (
                    <ReviewSummary
                      formData={formData}
                      updateFormData={updateFormData}
                      onSubmit={handleSubmit}
                      onBack={() => setCurrentStep(3)}
                      onJumpToStep={(step) => setCurrentStep(step)}
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                      theme={theme}
                    />
                  )
                )}
              </div>
            </div>

            {/* Right Column: Live Requirement Ticket Preview */}
            <div className="lg:col-span-5 xl:col-span-4">
              <EventPreviewCard formData={formData} theme={theme} />
            </div>
          </div>
        ) : (
          <RequirementFeed
            onPostNew={() => setActiveTab('wizard')}
            theme={theme}
          />
        )}
      </main>
    </div>
  );
}
