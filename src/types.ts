export type ScreenType = 'home' | 'camera' | 'xray' | 'results';

export interface MovementResult {
  rangeOfMotion: number; // in degrees
  rangeUnit: string;
  rangeStatus: 'Normal' | 'Mildly Restricted' | 'Restricted';
  rangeExplanation: string;
  symmetry: number; // percentage, e.g. 95%
  symmetryStatus: 'Balanced' | 'Slight Imbalance' | 'Asymmetric';
  symmetryExplanation: string;
  movementPattern: string;
  patternExplanation: string;
  irregularity: string;
  plainSummary: string; // Plain English for average person
  capturedFrameUrl?: string;
  keyFindings: string[];
  confidence: string;
  timestamp: string;
}

export interface HighlightedRegion {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage
  height: number; // percentage
  label: string;
  plainName: string; // e.g. "Lower Right Lung Section"
  confidence: string;
  description: string;
  plainExplanation: string; // Plain words
}

export interface XRayResult {
  imageUrl: string;
  modality: string;
  plainModality: string; // e.g. "Chest X-Ray Scan"
  highlightedRegions: HighlightedRegion[];
  keyFindings: string[];
  summary: string;
  plainSummary: string; // Easy for average person to understand
  recommendedNextStep: string;
  confidence: string;
  timestamp: string;
}

export type ActiveResult =
  | { type: 'camera'; data: MovementResult }
  | { type: 'xray'; data: XRayResult };
