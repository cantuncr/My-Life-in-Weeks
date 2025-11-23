import React from 'react';
import { STAGE_CONFIG } from '../constants';

export const Legend: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 max-w-4xl mx-auto">
      {STAGE_CONFIG.map((stage) => (
        <div key={stage.stage} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
          <span className="text-xs text-zinc-400 font-medium">{stage.stage}</span>
        </div>
      ))}
    </div>
  );
};