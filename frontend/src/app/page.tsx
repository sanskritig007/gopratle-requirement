'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { StepIndicator } from '@/components/wizard/StepIndicator';
import { Step1EventBasics } from '@/components/wizard/Step1EventBasics';
import { LiveRequirementPreview } from '@/components/wizard/LiveRequirementPreview';
import { IRequirementFormData, CategoryType } from '@/types/requirement';
import { SAMPLE_PRESETS } from '@/lib/constants';

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
              <StepIndicator
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
                {/* Step 1: Event Basics & Category */}
                {currentStep === 1 && (
                  <Step1EventBasics
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={() => setCurrentStep(2)}
                    theme={theme}
                  />
                )}

                {/* Step 2 placeholder (Phase 3) */}
                {currentStep === 2 && (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500 mx-auto flex items-center justify-center text-2xl font-bold">
                      02
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Step 2: Category Specific Specs ({formData.category.toUpperCase()})
                    </h3>
                    <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Phase 3 will render category-specific fields here (Planner scope & budget / Performer genres & duration / Crew headcount & roles).
                    </p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                        isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      ← Back to Step 1
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Live Requirement Ticket Preview */}
            <div className="lg:col-span-5 xl:col-span-4">
              <LiveRequirementPreview formData={formData} theme={theme} />
            </div>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Requirements Feed</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Live listings explorer will be available in Phase 5.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-500 text-white cursor-pointer"
            >
              Post a Requirement
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
