
// import { DocumentMetrics } from '../types'; // Type information is for build time

export const countWords = (text) => {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const countSentences = (text) => {
  if (!text.trim()) return 0;
  const sentences = text.trim().match(/[^.!?\n]+(?:[.!?]+|\n(?=[A-Z]))?/g);
  return sentences ? sentences.filter(s => s.trim().length > 0).length : 0;
};

export const countParagraphs = (text) => {
  if (!text.trim()) return 0;
  return text.trim().split(/\n\s*\n+/).filter(p => p.trim().length > 0).length;
};

export const calculateRetainedWordsPercentage = (text1, text2) => {
  const normalize = (t) => t.toLowerCase().replace(/[^\w\s']|_/g, "").replace(/\s+/g, " ");
  
  const cleanedText1 = normalize(text1);
  const cleanedText2 = normalize(text2);

  const words1 = new Set(cleanedText1.split(' ').filter(Boolean));
  const words2 = new Set(cleanedText2.split(' ').filter(Boolean));

  if (words1.size === 0) return 0;

  let commonCount = 0;
  for (const word of words1) {
    if (words2.has(word)) {
      commonCount++;
    }
  }
  
  return (commonCount / words1.size) * 100;
};

export const analyzeDocument = (text) => {
  return {
    wordCount: countWords(text),
    sentenceCount: countSentences(text),
    paragraphCount: countParagraphs(text),
  };
};
