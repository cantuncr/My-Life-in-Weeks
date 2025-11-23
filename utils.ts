import { WEEKS_PER_YEAR } from './constants';

export const calculateWeeksLived = (birthDate: Date): number => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return diffWeeks;
};

export const getDateForWeek = (birthDate: Date, totalWeeksToAdd: number): string => {
  const result = new Date(birthDate);
  result.setDate(result.getDate() + (totalWeeksToAdd * 7));
  return result.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Returns a class name for the cell based on status
export const getCellBaseClass = (isLived: boolean, isCurrent: boolean): string => {
  if (isCurrent) return 'animate-pulse ring-2 ring-white z-10';
  if (isLived) return 'opacity-100';
  return 'opacity-20 bg-zinc-700';
};