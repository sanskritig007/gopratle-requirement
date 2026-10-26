'use client';

import React from 'react';
import { Check, Calendar, Layers, Sliders, FileCheck } from 'lucide-react';
import { CategoryType } from '@/types/requirement';

interface StepperProps {
  currentStep: number;
  category: CategoryType;
  onStepClick?: (step: number) => void;
  theme?: 'dark' | 'light';
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  category,
  onStepClick,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const getStep2Title = () => {
    switch (category) {
      case 'planner':
        return { label: 'Scope & Scale', desc: 'Budget & Guest Count' };
      case 'performer':
        return { label: 'Performance Specs', desc: 'Genre & Duration' };
      case 'crew':
        return { label: 'Roles & Staffing', desc: 'Headcounts & Positions' };
      default:
        return { label: 'Category Specs', desc: 'Requirements' };
    }
  };

  const getStep3Title = () => {
    switch (category) {
      case 'planner':
        return { label: 'Theme & Logistics', desc: 'Vibe & Catering' };
      case 'performer':
        return { label: 'Stage & Sound', desc: 'PA & Technicals' };
      case 'crew':
        return { label: 'Shifts & Gear', desc: 'Timings & Equipment' };
      default:
        return { label: 'Logistics', desc: 'Schedule & Setup' };
    }
  };

  const steps = [
    {
      number: 1,
      label: 'Event Basics',
      desc: 'Name, Dates & Category',
      icon: Calendar,
    },
    {
      number: 2,
      label: getStep2Title().label,
      desc: getStep2Title().desc,
      icon: Layers,
    },
    {
      number: 3,
      label: getStep3Title().label,
      desc: getStep3Title().desc,
      icon: Sliders,
    },
    {
      number: 4,
      label: 'Review & Post',
      desc: 'Summary & Host Info',
      icon: FileCheck,
    },
  ];

  return (
    <div className="w-full mb-8">
      {/* Step Bubbles & Labels */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              onClick={() => {
                if (isCompleted && onStepClick) {
                  onStepClick(step.number);
                }
              }}
              className={`flex flex-col items-center sm:items-start p-2 sm:p-3 rounded-2xl transition-all duration-200 ${
                isCompleted
                  ? isDark ? 'cursor-pointer hover:bg-slate-900/60' : 'cursor-pointer hover:bg-slate-100'
                  : ''
              } ${
                isActive
                  ? isDark
                    ? 'bg-slate-900/80 border border-orange-500/30 shadow-lg shadow-orange-500/5'
                    : 'bg-white border border-orange-500/30 shadow-md shadow-orange-500/10'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : isActive
                      ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-500/40'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 border border-slate-700/60'
                      : 'bg-slate-200 text-slate-600 border border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                </div>

                <span
                  className={`hidden sm:inline text-[11px] font-bold uppercase tracking-wider ${
                    isActive ? 'text-orange-500' : isCompleted ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  Step 0{step.number}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="text-center sm:text-left">
                <h4
                  className={`text-xs sm:text-sm font-semibold truncate max-w-[120px] sm:max-w-none transition-colors ${
                    isActive
                      ? isDark ? 'text-white' : 'text-slate-900'
                      : isCompleted
                      ? isDark ? 'text-slate-200' : 'text-slate-700'
                      : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </h4>
                <p className={`hidden md:block text-[11px] truncate ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smooth Progress Bar */}
      <div className={`mt-4 w-full h-1.5 rounded-full overflow-hidden border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-400 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  );
};
