
export interface DocumentMetrics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
}

export interface SemanticAnalysisResult {
  semanticChangePercentage: number;
  justification: string;
}

export interface ComparisonResult {
  doc1Metrics: DocumentMetrics;
  doc2Metrics: DocumentMetrics;
  wordCountDelta: number;
  sentenceCountDelta: number;
  paragraphCountDelta: number;
  retainedWordsPercentage: number;
  semanticAnalysis: SemanticAnalysisResult | null;
}

export interface StatCardProps {
  title: string;
  value?: string | number;
  value1?: string | number;
  value2?: string | number;
  delta?: string | number;
  unit?: string;
  description?: string;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface TextAreaInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

export interface ComparisonResultsDisplayProps {
  results: ComparisonResult | null;
  isLoadingSemantic: boolean;
}

export interface LoaderProps {
  size?: string;
  color?: string;
  text?: string;
}

export interface ErrorMessageProps {
  message: string | null;
}
