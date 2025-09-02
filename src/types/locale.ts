export const languages = ['bg-BG', 'en-US'] as const;
export type Language = (typeof languages)[number];
