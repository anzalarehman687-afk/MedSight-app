import React from 'react';
import { Video, ScanLine, ArrowRight } from 'lucide-react';
import { ScreenType } from '../types';

interface HomeScreenProps {
  onSelectMode: (mode: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectMode }) => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center">
      {/* Title block */}
      <div className="text-center mb-14 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-2.5">
          MedSight
        </h1>
        <p className="text-base text-slate-600 font-normal">
          Visual AI for Medical Assessment
        </p>
      </div>

      {/* Two core options */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {/* Option 1: Camera Analysis */}
        <button
          onClick={() => onSelectMode('camera')}
          className="group relative flex flex-col items-start p-8 rounded-xl bg-white border border-slate-200/90 hover:border-sky-500 hover:shadow-md transition-all text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-600 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-6 group-hover:bg-sky-100 transition-colors">
            <Video className="w-6 h-6 stroke-[1.8]" />
          </div>

          <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center justify-between w-full">
            <span>Camera Analysis</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition-all" />
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Analyze body movement through your camera.
          </p>

          <div className="mt-auto pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-500">
            <span>Step-by-step guided movement</span>
            <span className="font-medium text-sky-700">5-second test</span>
          </div>
        </button>

        {/* Option 2: X-Ray Analysis */}
        <button
          onClick={() => onSelectMode('xray')}
          className="group relative flex flex-col items-start p-8 rounded-xl bg-white border border-slate-200/90 hover:border-sky-500 hover:shadow-md transition-all text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-600 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-6 group-hover:bg-sky-100 transition-colors">
            <ScanLine className="w-6 h-6 stroke-[1.8]" />
          </div>

          <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center justify-between w-full">
            <span>X-Ray Analysis</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition-all" />
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Upload an X-ray for visual AI analysis.
          </p>

          <div className="mt-auto pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-500">
            <span>Select any image or sample scan</span>
            <span className="font-medium text-sky-700">Detects regions</span>
          </div>
        </button>
      </div>

      {/* Subtle research disclaimer badge */}
      <div className="mt-16 text-center max-w-lg">
        <p className="text-xs text-slate-600 leading-relaxed">
          MedSight is an academic prototype designed to demonstrate computer vision in clinical assistance. It does not provide medical diagnoses.
        </p>
      </div>
    </main>
  );
};
