
import React from 'react';
// import { ComparisonResult, ComparisonResultsDisplayProps } from '../types'; // Type information is for build time
import StatCard from './StatCard';
import { Icons } from '../constants.tsx'; 

const ComparisonResultsDisplay = ({ results, isLoadingSemantic }) => {
  if (!results) {
    return null;
  }

  const { 
    doc1Metrics, 
    doc2Metrics, 
    wordCountDelta, 
    sentenceCountDelta, 
    paragraphCountDelta, 
    retainedWordsPercentage, 
    semanticAnalysis 
  } = results;

  return (
    <div className="mt-8" aria-live="polite">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Comparison Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Word Count"
          value={undefined} 
          value1={doc1Metrics.wordCount}
          value2={doc2Metrics.wordCount}
          delta={wordCountDelta}
          unit={undefined} 
          description="Total words in each document."
          isLoading={false}
        />
        <StatCard
          title="Sentence Count"
          value={undefined}
          value1={doc1Metrics.sentenceCount}
          value2={doc2Metrics.sentenceCount}
          delta={sentenceCountDelta}
          unit={undefined}
          description="Total sentences in each document."
          isLoading={false}
        />
        <StatCard
          title="Paragraph Count"
          value={undefined}
          value1={doc1Metrics.paragraphCount}
          value2={doc2Metrics.paragraphCount}
          delta={paragraphCountDelta}
          unit={undefined}
          description="Total paragraphs in each document."
          isLoading={false}
        />
        <StatCard
          title="Retained Words"
          value={retainedWordsPercentage.toFixed(2)}
          value1={undefined}
          value2={undefined}
          delta={undefined}
          unit="%"
          description="Percentage of unique words from Document 1 also present in Document 2."
          isLoading={false}
        />
        <StatCard
          title="Semantic Change Analysis"
          value={semanticAnalysis && !isNaN(semanticAnalysis.semanticChangePercentage) ? semanticAnalysis.semanticChangePercentage.toFixed(2) : undefined}
          value1={undefined}
          value2={undefined}
          delta={undefined}
          unit={semanticAnalysis && !isNaN(semanticAnalysis.semanticChangePercentage) ? "%" : undefined}
          description={semanticAnalysis ? semanticAnalysis.justification : 'Semantic analysis could not be performed or is pending.'}
          isLoading={isLoadingSemantic}
        />
      </div>
       {semanticAnalysis?.justification && !isLoadingSemantic && (
          <div className="mt-6 bg-white p-4 shadow-lg rounded-lg">
            <h4 className="text-md font-semibold text-sky-700 mb-2 flex items-center">
              <Icons.Semantic className="w-5 h-5 mr-2" aria-hidden="true" />
              Semantic Analysis Justification
            </h4>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{semanticAnalysis.justification}</p>
          </div>
        )}
    </div>
  );
};

export default ComparisonResultsDisplay;
