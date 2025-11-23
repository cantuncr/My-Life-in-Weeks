import React, { useMemo } from 'react';
import { getStageColor, WEEKS_PER_YEAR } from '../constants';
import { calculateWeeksLived } from '../utils';
import { useLanguage } from '../LanguageContext';

interface GridProps {
  birthDateStr: string;
  lifeExpectancy: number;
}

// Key ages to highlight on the Y-Axis
const MILESTONES = [18, 21, 30, 40, 50, 60, 65, 70, 80, 90, 100];

export const Grid: React.FC<GridProps> = ({ birthDateStr, lifeExpectancy }) => {
  const { t } = useLanguage();
  const { gridCells, livedWeeks } = useMemo(() => {
    if (!birthDateStr) return { gridCells: [], livedWeeks: 0 };
    
    const birthDate = new Date(birthDateStr);
    const lived = calculateWeeksLived(birthDate);
    const totalWeeks = lifeExpectancy * WEEKS_PER_YEAR;

    const cells = new Uint8Array(totalWeeks); // Memory optimization
    // 0: Future, 1: Lived, 2: Current
    
    for (let i = 0; i < totalWeeks; i++) {
        if (i < lived) cells[i] = 1;
        else cells[i] = 0;
    }
    // Set current week
    if (lived < totalWeeks && lived >= 0) cells[lived] = 2;

    return { gridCells: cells, livedWeeks: lived };
  }, [birthDateStr, lifeExpectancy]);

  if (!birthDateStr) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-600 animate-pulse">
        <p className="font-mono text-sm">{t('grid_awaiting')}</p>
      </div>
    );
  }

  // Generate Year Labels (Y-Axis)
  const yearLabels = Array.from({ length: lifeExpectancy }, (_, i) => i);
  
  // X-Axis Markers (We will place these in a grid to align perfectly)
  const weekMarkers = [1, 10, 20, 30, 40, 52];

  // Common height class to ensure Y-axis labels and Grid Cells align perfectly
  // Mobile: 8px height + 2px gap = 10px per row
  // Desktop: 11px height + 2px gap = 13px per row
  const CELL_HEIGHT_CLASS = "h-[8px] md:h-[11px]";

  return (
    <div className="w-full overflow-x-auto pb-12 custom-scrollbar">
      {/* 
        Min-width ensures the 52 columns don't get crushed on mobile.
        User must scroll horizontally on small phones, which is better for precision.
      */}
      <div className="min-w-[800px] max-w-5xl mx-auto px-4">
        
        {/* CONTAINER FOR ALIGNMENT */}
        <div className="flex flex-col">

            {/* X-AXIS (WEEKS) HEADER */}
            {/* We add a left margin/padding to account for the Y-Axis width (approx 3rem/48px) */}
            <div className="pl-10 mb-2">
                <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-[2px]">
                    {Array.from({ length: 52 }).map((_, i) => {
                        const weekNum = i + 1;
                        const showMarker = weekMarkers.includes(weekNum);
                        return (
                            <div key={i} className="relative flex justify-center h-4">
                                {showMarker && (
                                    <>
                                        {/* Little tick mark */}
                                        <div className="absolute bottom-0 w-[1px] h-1 bg-zinc-600"></div>
                                        {/* Number */}
                                        <span className="absolute bottom-2 text-[9px] font-mono text-zinc-500 font-medium">
                                            {weekNum}
                                        </span>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MAIN CONTENT ROW (Y-AXIS + GRID) */}
            <div className="flex flex-row">
                
                {/* Y-AXIS (YEARS) */}
                {/* Fixed width column. Gap must match grid gap exactly (2px) */}
                <div className="flex flex-col gap-[2px] w-10 shrink-0 mr-1 pt-[1px]">
                    {yearLabels.map((year) => {
                        const isMilestone = MILESTONES.includes(year);
                        return (
                            <div 
                                key={year} 
                                className={`${CELL_HEIGHT_CLASS} flex items-center justify-end relative pr-2`}
                            >
                                {/* Milestone Line Indicator */}
                                {isMilestone && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-full bg-[#00bf63] opacity-60"></div>
                                )}
                                
                                {/* Label (Only show every 5 years or milestones to reduce clutter) */}
                                {(year % 5 === 0 || isMilestone) ? (
                                    <span className={`text-[9px] font-mono leading-none tracking-tighter ${isMilestone ? 'text-[#00bf63] font-bold' : 'text-zinc-600'}`}>
                                        {year}
                                    </span>
                                ) : null}
                            </div>
                        );
                    })}
                </div>

                {/* THE GRID */}
                <div 
                    className="grid gap-[2px] w-full"
                    style={{ 
                        gridTemplateColumns: `repeat(${WEEKS_PER_YEAR}, minmax(0, 1fr))`,
                    }}
                >
                    {Array.from(gridCells).map((status, index) => {
                        const age = Math.floor(index / WEEKS_PER_YEAR);
                        const isCurrent = status === 2;
                        const isLived = status === 1;
                        
                        let className = `${CELL_HEIGHT_CLASS} rounded-[1px] bg-[#111] border border-[#222] transition-colors duration-500`;

                        if (isLived) {
                            className = `${CELL_HEIGHT_CLASS} rounded-[1px] ${getStageColor(age)} border-none opacity-60`;
                        }

                        if (isCurrent) {
                            return (
                                <div 
                                    key={index} 
                                    className={`${CELL_HEIGHT_CLASS} relative z-10`}
                                >
                                    <div className="absolute inset-0 bg-[#00bf63] animate-ping rounded-sm opacity-75"></div>
                                    <div className="absolute inset-0 bg-[#00bf63] shadow-[0_0_15px_#00bf63] rounded-[1px]"></div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className={className}
                            />
                        );
                    })}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};