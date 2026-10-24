/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, ActiveResult, MovementResult, XRayResult } from './types';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CameraScreen } from './components/CameraScreen';
import { XRayScreen } from './components/XRayScreen';
import { ResultsScreen } from './components/ResultsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [activeResult, setActiveResult] = useState<ActiveResult | null>(null);

  const handleCameraComplete = (data: MovementResult) => {
    setActiveResult({ type: 'camera', data });
    setCurrentScreen('results');
  };

  const handleXRayComplete = (data: XRayResult) => {
    setActiveResult({ type: 'xray', data });
    setCurrentScreen('results');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      <Header currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      <main className="flex-1 w-full">
        {currentScreen === 'home' && (
          <HomeScreen onSelectMode={setCurrentScreen} />
        )}

        {currentScreen === 'camera' && (
          <CameraScreen onAnalysisComplete={handleCameraComplete} />
        )}

        {currentScreen === 'xray' && (
          <XRayScreen onAnalysisComplete={handleXRayComplete} />
        )}

        {currentScreen === 'results' && activeResult && (
          <ResultsScreen result={activeResult} onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'results' && !activeResult && (
          <div className="max-w-md mx-auto py-20 text-center text-slate-500">
            <p className="text-sm">No analysis results currently recorded.</p>
            <button
              onClick={() => setCurrentScreen('home')}
              className="mt-4 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Return Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
