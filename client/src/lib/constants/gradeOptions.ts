export const GRADE_OPTIONS = [
  '1st Primary', '2nd Primary', '3rd Primary', '4th Primary', '5th Primary', '6th Primary',
  '1st Prep', '2nd Prep', '3rd Prep',
  '1st Secondary', '2nd Secondary', '3rd Secondary',
] as const;

export type GradeOption = typeof GRADE_OPTIONS[number]; 