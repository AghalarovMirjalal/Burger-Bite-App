import { Dimensions } from 'react-native';

export type ThemeMode = 'light' | 'dark';

// dark palette follows the Figma mockup one to one
const dark = {
  bg: '#242329',
  surface: '#2D2C32',
  surfaceLight: '#36353C',
  border: '#3A3940',
  text: '#FFFFFF',
  textSoft: '#E6E6E6',
  muted: '#8A8990',
  faint: '#6F6E75',
  orange: '#F7931E',
  brand: '#FF8A00',
  red: '#E0262D',
  plusArea: '#4A2D33',
  plusIcon: '#FFFFFF',
  tag: '#3E2A30',
  tagText: '#C8C8C8',
  cardBorder: '#7B532A',
  star: '#FFC700',
  circle: '#1C1B20',
  onCircle: '#FFFFFF',
  stepper: '#2F2E34',
  shadow: 'rgba(0, 0, 0, 0.55)',
  glowWarm: 'rgba(150, 100, 45, 0.32)',
  glowOlive: 'rgba(120, 110, 60, 0.30)',
  overlay: 'rgba(10, 10, 12, 0.6)',
};

export type Palette = typeof dark;

const light: Palette = {
  bg: '#F6F3EE',
  surface: '#FFFFFF',
  surfaceLight: '#EEE9E2',
  border: '#E3DED6',
  text: '#1F1E24',
  textSoft: '#3B3A41',
  muted: '#7D7B84',
  faint: '#9C9AA2',
  orange: '#F7931E',
  brand: '#FF8A00',
  red: '#D8262C',
  plusArea: '#FCE6D3',
  plusIcon: '#E07A12',
  tag: '#FBE7DA',
  tagText: '#9A5A2E',
  cardBorder: '#E7C49A',
  star: '#FFB800',
  circle: '#1F1E24',
  onCircle: '#FFFFFF',
  stepper: '#ECE7E0',
  shadow: 'rgba(80, 50, 20, 0.22)',
  glowWarm: 'rgba(247, 147, 30, 0.16)',
  glowOlive: 'rgba(247, 170, 60, 0.14)',
  overlay: 'rgba(30, 25, 20, 0.35)',
};

export const palettes: Record<ThemeMode, Palette> = { light, dark };

export const gradients = {
  red: ['#D42A2F', '#A5232A'] as const,
  orange: ['#F7951D', '#D9822A'] as const,
};

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  kanitLight: 'Kanit_300Light',
  kanit: 'Kanit_400Regular',
  kanitMedium: 'Kanit_500Medium',
  kanitSemibold: 'Kanit_600SemiBold',
};

// the mockups are drawn on a 390pt wide frame
const DESIGN_WIDTH = 390;
const { width } = Dimensions.get('window');
const ratio = Math.min(width, 520) / DESIGN_WIDTH;

export const s = (size: number) => Math.round(size * ratio * 10) / 10;
