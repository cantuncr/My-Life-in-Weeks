export enum LifeStage {
  EARLY_YEARS = 'Early Years',
  SCHOOL = 'School',
  CAREER = 'Career & Building',
  RETIREMENT = 'Golden Years'
}

export interface GridConfig {
  birthDate: Date | null;
  lifeExpectancy: number;
}

export interface WeekData {
  weekIndex: number; // Total week index (0 to totalWeeks)
  yearIndex: number; // 0 to lifeExpectancy
  weekOfYear: number; // 0 to 51
  isLived: boolean;
  isCurrent: boolean;
  stage: LifeStage;
  dateStr: string;
  age: number;
}