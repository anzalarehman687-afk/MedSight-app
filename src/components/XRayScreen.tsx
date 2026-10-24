import React, { useState, useRef } from 'react';
import { Upload, Scan, ArrowRight, RefreshCw, FileText, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { XRayResult, HighlightedRegion } from '../types';

// Preset sample images generated earlier
import chestSampleUrl from '../assets/images/xray_chest_sample_1792858641252.jpg';
import kneeSampleUrl from '../assets/images/xray_knee_sample_1792858641737.jpg';

interface XRayScreenProps {
  onAnalysisComplete: (result: XRayResult) => void;
}

interface PresetCase {
  id: string;
  name: string;
  plainName: string;
  view: string;
  imageUrl: string;
  region: HighlightedRegion;
  keyFindings: string[];
  summary: string;
  plainSummary: string;
  recommendedNextStep: string;
}

const PRESET_CASES: PresetCase[] = [
  {
    id: 'chest',
    name: 'Chest X-Ray (PA View)',
    plainName: 'Chest & Lung Scan',
    view: 'Thoracic Radiograph',
    imageUrl: chestSampleUrl,
    region: {
      id: 'reg-chest-1',
      x: 23,
      y: 48,
      width: 20,
      height: 22,
      label: 'Right lower lung zone',
      plainName: 'Lower Right Lung Area',
      confidence: '94%',
      description: 'Focal density variation observed in the lower-mid right lung perimeter.',
      plainExplanation: 'A small cloudy spot was spotted on the lower right lung. In clinic scans, this is often caused by mild fluid, congestion, or common inflammation.'
    },
    keyFindings: [
      'Heart size and main ribs appear normal and well-aligned.',
      'Small cloudy patch noticed in the lower right lung perimeter.',
      'Base of the lungs and diaphragm contours are otherwise clear.'
    ],
    summary: 'An area with subtle focal density variation was detected in the right lower lung zone requiring professional clinical review.',
    plainSummary: 'The AI highlighted a small cloudy patch on the lower right lung. This is common with mild fluid, infection, or bronchitis, and should be reviewed by your physician.',
    recommendedNextStep: 'Show this scan to your family physician or pulmonologist to listen to your breathing or verify with a standard clinical check.'
  },
  {
    id: 'knee',
    name: 'Knee Joint X-Ray (Lateral View)',
    plainName: 'Knee & Joint Scan',
    view: 'Femoretibial Radiograph',
    imageUrl: kneeSampleUrl,
    region: {
      id: 'reg-knee-1',
      x: 48,
      y: 38,
      width: 24,
      height: 26,
      label: 'Femoral condyle margin',
      plainName: 'Knee Joint Space & Bone Edge',
      confidence: '93%',
      description: 'Minor joint space narrowing with subtle cortical contour irregularity.',
      plainExplanation: 'A slight thinning of the normal cushion space between the thigh bone and shin bone, typical of early joint wear or minor cartilage rubbing.'
    },
    keyFindings: [
      'Thigh bone (femur) and shin bone (tibia) structure remain solid and intact.',
      'Slight narrowing of the joint gap along the outer edge of the knee.',
      'Kneecap position and bone alignment look normal.'
    ],
    summary: 'A localized region of joint space irregularity along the condylar margin was identified for radiographic review.',
    plainSummary: 'The AI noticed slight narrowing in the joint cushion space. This is very common with everyday knee wear, mild arthritis, or natural aging.',
    recommendedNextStep: 'Consult an orthopedic specialist or physical therapist if you experience any stiffness or discomfort when walking.'
  }
];

export const XRayScreen: React.FC<XRayScreenProps> = ({ onAnalysisComplete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(chestSampleUrl);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('chest');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<XRayResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSelectedImage(event.target.result);
        setSelectedCaseId('custom');
        setAnalysisResult(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset: PresetCase) => {
    setSelectedImage(preset.imageUrl);
    setSelectedCaseId(preset.id);
    setUploadedFileName(null);
    setAnalysisResult(null);
  };

  // Perform Simulated Medical Computer-Vision Scan
  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setScanProgress(0);
    setAnalysisResult(null);

    const interval = 80;
    const totalDuration = 2200;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setScanProgress(pct);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setIsScanning(false);
        generateScanResult();
      }
    }, interval);
  };

  const generateScanResult = () => {
    if (selectedCaseId === 'chest') {
      const preset = PRESET_CASES[0];
      const result: XRayResult = {
        imageUrl: selectedImage!,
        modality: preset.name,
        plainModality: preset.plainName,
        highlightedRegions: [preset.region],
        keyFindings: preset.keyFindings,
        summary: preset.summary,
        plainSummary: preset.plainSummary,
        recommendedNextStep: preset.recommendedNextStep,
        confidence: 'High Scan Confidence (94%)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAnalysisResult(result);
    } else if (selectedCaseId === 'knee') {
      const preset = PRESET_CASES[1];
      const result: XRayResult = {
        imageUrl: selectedImage!,
        modality: preset.name,
        plainModality: preset.plainName,
        highlightedRegions: [preset.region],
        keyFindings: preset.keyFindings,
        summary: preset.summary,
        plainSummary: preset.plainSummary,
        recommendedNextStep: preset.recommendedNextStep,
        confidence: 'High Scan Confidence (93%)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAnalysisResult(result);
    } else {
      // Custom uploaded image
      const customRegion: HighlightedRegion = {
        id: 'reg-custom-1',
        x: 32,
        y: 34,
        width: 32,
        height: 28,
        label: 'Density gradient variation',
        plainName: 'Central Tissue & Density Area',
        confidence: '91%',
        description: 'Localized variance in radiographic density requiring clinical radiologist correlation.',
        plainExplanation: 'A noticeable shift in shading was spotted here compared to surrounding tissue. This may be normal anatomy or a noteworthy area for a doctor to review.'
      };

      const result: XRayResult = {
        imageUrl: selectedImage!,
        modality: 'Uploaded Medical Radiograph',
        plainModality: 'Custom Medical Image Scan',
        highlightedRegions: [customRegion],
        keyFindings: [
          'Overall image contrast and anatomical boundaries detected.',
          'Noted a slight difference in shading in the boxed area.',
          'No severe structural fractures or major shifts detected by the prototype.'
        ],
        summary: 'An area requiring professional review was detected based on radiographic contrast gradient deviation.',
        plainSummary: 'The visual model located one area with distinct density variation that should be checked by a healthcare professional.',
        recommendedNextStep: 'Present this scan to your doctor or medical imaging center for an official diagnostic reading.',
        confidence: 'Visual Model Confidence (91%)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAnalysisResult(result);
    }
  };

  const handleProceedToResults = () => {
    if (analysisResult) {
      onAnalysisComplete(analysisResult);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Top Clinical Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            X-Ray Image Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload or select an X-ray to highlight noteworthy areas for doctor review
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Upload New X-Ray</span>
          </button>
        </div>
      </div>

      {/* Preset samples selector bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 mr-1">Choose a scan:</span>
        {PRESET_CASES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
              selectedCaseId === preset.id
                ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {preset.plainName}
          </button>
        ))}

        {selectedCaseId === 'custom' && (
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3" />
            <span>Uploaded: {uploadedFileName || 'Custom File'}</span>
          </span>
        )}
      </div>

      {/* Main Analysis Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prominent X-Ray Display Stage (2 columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-300 shadow-xs flex items-center justify-center">
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Medical Radiograph"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter contrast-105"
                />

                {/* DICOM scale tag */}
                <div className="absolute top-3 left-3 pointer-events-none text-[11px] font-mono text-slate-300 bg-black/60 px-2.5 py-0.5 rounded-sm">
                  {selectedCaseId === 'chest' ? 'Chest Radiograph' : selectedCaseId === 'knee' ? 'Knee Radiograph' : 'Custom Radiograph'}
                </div>

                {/* Scan Line Animation */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="w-full h-1 bg-sky-400 shadow-[0_0_12px_#38bdf8] transition-all"
                      style={{ transform: `translateY(${scanProgress * 4}px)` }}
                    ></div>
                    <div className="absolute inset-0 bg-sky-900/10"></div>
                  </div>
                )}

                {/* Highlighted Noteworthy Region Box (Post-Analysis) */}
                {analysisResult &&
                  analysisResult.highlightedRegions.map((region) => (
                    <div
                      key={region.id}
                      className="absolute border-2 border-sky-400 bg-sky-500/15 pointer-events-none transition-all duration-300"
                      style={{
                        left: `${region.x}%`,
                        top: `${region.y}%`,
                        width: `${region.width}%`,
                        height: `${region.height}%`
                      }}
                    >
                      {/* Corner markers */}
                      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></span>
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white"></span>
                      <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white"></span>
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></span>

                      {/* Noteworthy Region Tag */}
                      <span className="absolute -top-6 left-0 text-[10px] font-semibold text-white bg-sky-800 px-2 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
                        Noteworthy Area
                      </span>
                    </div>
                  ))}
              </>
            ) : (
              <div className="text-center p-8 text-slate-400">
                <Scan className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                <p className="text-xs">No X-ray selected. Please choose a sample or upload a file.</p>
              </div>
            )}
          </div>

          {/* Action Trigger Bar */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span>Ready for visual assessment</span>
            </div>

            <div className="flex items-center gap-3">
              {analysisResult && (
                <button
                  onClick={handleAnalyze}
                  disabled={isScanning}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Again</span>
                </button>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isScanning || !selectedImage}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>{isScanning ? `Analyzing (${scanProgress}%)...` : 'Analyze Image'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Small Result Panel (Right Column) */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 h-full flex flex-col justify-between shadow-xs">
            <div>
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 tracking-wide uppercase">
                  Image Findings
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {analysisResult ? 'Analysis Ready' : 'Awaiting Scan'}
                </span>
              </div>

              {analysisResult ? (
                <div className="mt-5 space-y-4">
                  {/* Potentially noteworthy region panel */}
                  <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 space-y-2">
                    <span className="text-xs font-bold text-sky-900 block">
                      Potentially noteworthy region
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      An area requiring professional review was detected.
                    </p>
                    <p className="text-xs text-slate-600 pt-2 border-t border-sky-200/60 leading-relaxed">
                      {analysisResult.plainSummary}
                    </p>
                  </div>

                  {/* Highlighted area explanation in plain English */}
                  {analysisResult.highlightedRegions.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-xs font-semibold text-slate-800">
                        What this highlighted area represents:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {analysisResult.highlightedRegions[0].plainExplanation}
                      </p>
                    </div>
                  )}

                  {/* Recommendation for the patient/user */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      What to do next:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {analysisResult.recommendedNextStep}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="text-xs leading-relaxed max-w-xs text-slate-600">
                    Click &quot;Analyze Image&quot; to review the scan. The app will detect key features and point out any area that warrants a doctor&apos;s look.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom action when results exist */}
            {analysisResult && (
              <div className="pt-4 mt-6 border-t border-slate-100">
                <button
                  onClick={handleProceedToResults}
                  className="w-full py-2.5 px-4 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>View Full Assessment Summary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
