import React, { useState, useCallback } from 'react';
import TextAreaInput from './components/TextAreaInput';
import ComparisonResultsDisplay from './components/ComparisonResultsDisplay';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { analyzeDocument, calculateRetainedWordsPercentage } from './services/textAnalysisService';
import { analyzeSemanticChange } from './services/geminiService';
import { ComparisonResult, SemanticAnalysisResult } from './types'; 
import { Icons } from './constants.tsx'; 

const App = () => {
  const [doc1Text, setDoc1Text] = useState('');
  const [doc2Text, setDoc2Text] = useState('');
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSemantic, setIsLoadingSemantic] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = useCallback(async () => {
    if (!doc1Text.trim() && !doc2Text.trim()) {
      setError("Please enter text in at least one of the documents to compare.");
      setComparisonResults(null);
      return;
    }

    setIsLoading(true);
    setIsLoadingSemantic(true);
    setError(null);
    // Reset results partially, keeping old metrics if semantic fails later
    setComparisonResults(prev => prev ? {...prev, semanticAnalysis: null} : null);


    try {
      const doc1Metrics = analyzeDocument(doc1Text);
      const doc2Metrics = analyzeDocument(doc2Text);

      const wordCountDelta = doc2Metrics.wordCount - doc1Metrics.wordCount;
      const sentenceCountDelta = doc2Metrics.sentenceCount - doc1Metrics.sentenceCount;
      const paragraphCountDelta = doc2Metrics.paragraphCount - doc1Metrics.paragraphCount;
      const retainedWordsPercentage = calculateRetainedWordsPercentage(doc1Text, doc2Text);

      const initialResults: ComparisonResult = {
        doc1Metrics,
        doc2Metrics,
        wordCountDelta,
        sentenceCountDelta,
        paragraphCountDelta,
        retainedWordsPercentage,
        semanticAnalysis: null, 
      };
      setComparisonResults(initialResults);
      setIsLoading(false); 

      if (doc1Text.trim() && doc2Text.trim()) {
        try {
          const semanticAnalysisResult = await analyzeSemanticChange(doc1Text, doc2Text);
          setComparisonResults(prevResults => prevResults ? { ...prevResults, semanticAnalysis: semanticAnalysisResult } : null);
        } catch (semanticError) {
          console.error("Semantic analysis error:", semanticError);
          const message = semanticError instanceof Error ? semanticError.message : 'Unknown error during semantic analysis.';
          setError(prevError => prevError ? `${prevError} Semantic analysis failed: ${message}` : `Semantic analysis failed: ${message}`);
          
          const errorSemanticAnalysis: SemanticAnalysisResult = { 
            semanticChangePercentage: NaN, 
            justification: `Semantic analysis failed: ${message}` 
          };
          setComparisonResults(prevResults => prevResults ? { ...prevResults, semanticAnalysis: errorSemanticAnalysis } : null);
        } finally {
          setIsLoadingSemantic(false);
        }
      } else {
         const justificationText = (doc1Text.trim() || doc2Text.trim()) 
            ? "Semantic analysis not performed as one document is empty."
            : "Semantic analysis not performed as both documents are empty.";
        const emptySemanticAnalysis: SemanticAnalysisResult = { 
            semanticChangePercentage: 0, // Or NaN if preferred for "not applicable"
            justification: justificationText
        };
        setComparisonResults(prevResults => prevResults ? { ...prevResults, semanticAnalysis: emptySemanticAnalysis } : null);
        setIsLoadingSemantic(false);
      }

    } catch (e) {
      console.error("Comparison error:", e);
      const message = e instanceof Error ? e.message : "An unknown error occurred during comparison.";
      setError(message);
      setComparisonResults(null); // Clear all results on major error
      setIsLoading(false);
      setIsLoadingSemantic(false);
    }
  }, [doc1Text, doc2Text]);

  const isCompareDisabled = isLoading || isLoadingSemantic;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-sky-700 tracking-tight sm:text-5xl">
            Document Delta Analyzer
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Compare two documents to identify key differences and semantic shifts.
          </p>
        </header>

        <main className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TextAreaInput
              id="doc1"
              label="Document 1"
              value={doc1Text}
              onChange={(e) => setDoc1Text(e.target.value)}
              placeholder="Paste the content of the first document here..."
              disabled={isCompareDisabled}
              rows={12}
            />
            <TextAreaInput
              id="doc2"
              label="Document 2"
              value={doc2Text}
              onChange={(e) => setDoc2Text(e.target.value)}
              placeholder="Paste the content of the second document here..."
              disabled={isCompareDisabled}
              rows={12}
            />
          </div>

          <div className="text-center mb-8">
            <button
              type="button"
              onClick={handleCompare}
              disabled={isCompareDisabled}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-150"
              aria-busy={isCompareDisabled}
              aria-describedby={isCompareDisabled ? "loading-message" : undefined}
            >
              {isCompareDisabled ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span id="loading-message">Analyzing...</span>
                </>
              ) : (
                'Compare Documents'
              )}
            </button>
          </div>

          {isLoading && !comparisonResults && <Loader text="Performing initial analysis..." />}
          {error && <ErrorMessage message={error} />}
          
          {comparisonResults && (
            <ComparisonResultsDisplay 
              results={comparisonResults} 
              isLoadingSemantic={isLoadingSemantic && (!comparisonResults.semanticAnalysis || isNaN(comparisonResults.semanticAnalysis.semanticChangePercentage))}
            />
          )}
        </main>

        <footer className="text-center mt-12 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Document Delta Analyzer. Powered by AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;