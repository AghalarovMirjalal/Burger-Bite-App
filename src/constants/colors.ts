export const colors = {
  background: '#242329',
  primary: '#FF8A19',
  login: '#CC2229',
  signup: '#F99B1D',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.35)',
  textLink: 'rgba(255,255,255,0.45)',
  glow: 'rgba(255,196,110,0.10)',
  glowWarm: 'rgba(226, 185, 120, 0.10)',
} as const;

export type Colors = typeof colors;
