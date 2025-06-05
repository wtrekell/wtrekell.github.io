
import React from 'react';
// import { StatCardProps } from '../types'; // Type information is for build time

const StatCard = ({ title, value, value1, value2, delta, unit, description, isLoading, size = 'medium' }) => {
  const cardPadding = size === 'small' ? 'p-3' : size === 'large' ? 'p-6' : 'p-4';
  const titleSize = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
  const valueSize = size === 'small' ? 'text-xl' : size === 'large' ? 'text-3xl' : 'text-2xl';
  const descriptionSize = size === 'small' ? 'text-xs' : 'text-sm';

  const renderValue = () => {
    if (isLoading) {
      return <div className={`h-8 bg-slate-200 rounded animate-pulse ${valueSize}`} style={{ width: '50%' }} aria-label="Loading value"></div>;
    }
    if (value !== undefined) {
      return <span className={`${valueSize} font-bold text-sky-600`}>{value}{unit}</span>;
    }
    if (value1 !== undefined && value2 !== undefined) {
      return (
        <div className="grid grid-cols-2 gap-2 items-baseline">
          <div>
            <span className="text-xs text-slate-500 block">Doc 1</span>
            <span className={`${valueSize} font-semibold text-slate-700`}>{value1}{unit}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Doc 2</span>
            <span className={`${valueSize} font-semibold text-slate-700`}>{value2}{unit}</span>
          </div>
        </div>
      );
    }
    return <span className={`${valueSize} font-semibold text-slate-700`}>N/A</span>;
  };

  const renderDelta = () => {
    if (isLoading) return null;
    if (delta !== undefined) {
      const deltaNum = Number(delta);
      const deltaColor = deltaNum > 0 ? 'text-green-600' : deltaNum < 0 ? 'text-red-600' : 'text-slate-500';
      const deltaSign = deltaNum > 0 ? '+' : '';
      return (
        <p className={`text-sm font-semibold ${deltaColor}`}>
          Delta: {deltaSign}{delta}
        </p>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg ${cardPadding} flex flex-col justify-between h-full`}>
      <div>
        <h3 className={`${titleSize} font-medium text-slate-800 mb-2`}>{title}</h3>
        {renderValue()}
        {renderDelta()}
      </div>
      {description && !isLoading && <p className={`${descriptionSize} text-slate-600 mt-2`}>{description}</p>}
      {description && isLoading && <div className="h-4 mt-2 bg-slate-200 rounded animate-pulse w-full" aria-label="Loading description"></div>}
    </div>
  );
};

export default StatCard;
