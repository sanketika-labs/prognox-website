/**
 * Icon path data on the 24px Lucide grid.
 *
 * Kept as a hand-rolled set rather than an icon library so nothing ships to
 * the client at runtime and every page stays zero-JS.
 */
export const iconPaths = {
  bolt: 'M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z',
  unlock: 'M7 11V8a5 5 0 019.9-1M5 11h14v10H5z',
  plug: 'M9 2v6M15 2v6M7 8h10v3a5 5 0 01-10 0V8zM12 16v6',
  automate:
    'M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M12 9a3 3 0 100 6 3 3 0 000-6z',
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3.5 2',
  scale: 'M3 20h18M6 20V9m6 11V4m6 16v-7',
  chat: 'M21 12a8 8 0 01-11.6 7.1L3 21l1.9-6.4A8 8 0 1121 12z',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.2-4.2',
  shield: 'M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3z',
  spark:
    'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z',
  database:
    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  gauge: 'M4 18a9 9 0 1116 0M12 14l4-4',
  workflow: 'M4 4h6v6H4V4zM14 14h6v6h-6v-6zM10 7h4a3 3 0 013 3v4',
  cloud: 'M7 18a4.5 4.5 0 01-.4-9A6 6 0 0118 9.5a4 4 0 01.5 8H7z',
  check: 'M4 12.5l5 5L20 6.5',
  trend: 'M3 17l6-6 4 3.5L21 6M15 6h6v6',
  users: 'M16 20v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8zM22 20v-2a4 4 0 00-3-3.9M17 3.1a4 4 0 010 7.8',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
} as const;

export type IconName = keyof typeof iconPaths;
