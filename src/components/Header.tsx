import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="w-full border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-600 rounded-sm"
        >
          <div className="w-8 h-8 rounded-md bg-sky-700 flex items-center justify-center text-white shadow-xs">
            <Activity className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-slate-900 leading-tight">
              MedSight
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              Visual AI for Medical Assessment
            </span>
          </div>
        </button>

        {/* Navigation & Status Zone */}
        <div className="flex items-center gap-4">
          {currentScreen !== 'home' ? (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          ) : (
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Clinical Research Prototype
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
