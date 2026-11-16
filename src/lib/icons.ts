/**
 * Icon path data on the 24px Lucide grid.
 *
 * Hand-rolled rather than pulled from an icon library so nothing ships to the
 * client at runtime beyond the few lines the theme toggle needs.
 */
export const iconPaths = {
  check: 'M4 12.5l5 5L20 6.5',
  play: 'M7 4.5l12 7.5-12 7.5v-15z',
  arrowUpRight: 'M7 17L17 7M8 7h9v9',
  arrowRight: 'M4 12h15M13 6l6 6-6 6',
  sun: 'M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z',
} as const;

export type IconName = keyof typeof iconPaths;
