import React from 'react';
import { ArrowLeft, Printer, CheckCircle2, Info } from 'lucide-react';
import { ActiveResult, ScreenType } from '../types';

interface ResultsScreenProps {
  result: ActiveResult;
  onNavigate: (screen: ScreenType) => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onNavigate }) => {
  const isCamera = result.type === 'camera';
  const data = result.data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Top Clinical Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Assessment Results
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isCamera
              ? 'Body Movement & Joint Range Summary'
              : `${'plainModality' in data ? data.plainModality : 'Radiograph'} Visual Review`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(isCamera ? 'camera' : 'xray')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to {isCamera ? 'Camera' : 'X-Ray'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Visual Frame Presentation */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {isCamera ? 'Captured Movement Frame' : 'Analyzed X-Ray Image'}
          </span>

          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-300 flex items-center justify-center shadow-xs">
            {isCamera && 'capturedFrameUrl' in data && data.capturedFrameUrl ? (
              <img
                src={data.capturedFrameUrl}
                alt="Captured Movement Skeleton Frame"
                className="w-full h-full object-contain"
              />
            ) : !isCamera && 'imageUrl' in data && data.imageUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={data.imageUrl}
                  alt="Analyzed X-Ray"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter contrast-105"
                />
                {/* Highlighted noteworthy region */}
                {data.highlightedRegions.map((region) => (
                  <div
                    key={region.id}
                    className="absolute border-2 border-sky-400 bg-sky-500/20 pointer-events-none"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      width: `${region.width}%`,
                      height: `${region.height}%`
                    }}
                  >
                    <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white"></span>
                    <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white"></span>
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></span>
                    <span className="absolute -top-6 left-0 text-[10px] font-semibold text-white bg-sky-800 px-2 py-0.5 rounded-xs whitespace-nowrap shadow-xs">
                      {region.plainName}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Processed frame preview
              </div>
            )}

            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-300 bg-black/60 px-2.5 py-0.5 rounded-sm">
              Recorded at: {data.timestamp}
            </div>
          </div>

          {/* Simple confidence indicator */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-xs shadow-xs">
            <span className="text-slate-600">Scan Clarity:</span>
            <span className="text-sky-800 font-semibold">{data.confidence}</span>
          </div>
        </div>

        {/* Findings & Plain Explanation */}
        <div className="flex flex-col gap-6">
          {/* Key Findings (2-3 maximum) */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                Key Findings
              </span>
              <span className="text-[11px] text-slate-500">
                Primary Observations
              </span>
            </div>

            <ul className="space-y-3">
              {data.keyFindings.slice(0, 3).map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                  <span className="text-sky-700 font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}.
                  </span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Short Explanation for Normal Everyday Person */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 block">
              What This Means in Plain Words
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {result.type === 'camera'
                ? result.data.plainSummary
                : result.data.plainSummary}
            </p>
          </div>

          {/* Quantitative overview for camera test */}
          {result.type === 'camera' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">
                  Arm Flexibility
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  {result.data.rangeOfMotion}°
                </span>
                <span className="block text-[11px] text-emerald-700 font-medium mt-0.5">
                  {result.data.rangeStatus}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">
                  Side Balance
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  {result.data.symmetry}%
                </span>
                <span className="block text-[11px] text-sky-800 font-medium mt-0.5">
                  {result.data.symmetryStatus}
                </span>
              </div>
            </div>
          )}

          {/* Recommended Next Step for X-Ray */}
          {result.type === 'xray' && (
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <span className="text-xs font-semibold text-sky-900 block mb-1">
                Recommended Doctor Consultation:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {result.data.recommendedNextStep}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Academic Prototype Research Disclaimer at Bottom */}
      <div className="mt-12 p-4 rounded-xl bg-slate-100 border border-slate-200 text-center">
        <p className="text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold">Important: </strong>
          This prototype is for research and educational purposes and does not provide a medical diagnosis.
        </p>
      </div>
    </div>
  );
};
