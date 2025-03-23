export const COLORS = {
  light: {
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1e293b',
    subText: '#64748b',
    primary: '#2563eb',
    border: '#e2e8f0',
    input: '#f5f5f5',
    error: '#ef4444',
    success: '#22c55e',
  },
  dark: {
    background: '#1e293b',
    card: '#0f172a',
    text: '#f8fafc',
    subText: '#94a3b8',
    primary: '#60a5fa',
    border: '#334155',
    input: '#334155',
    error: '#f87171',
    success: '#4ade80',
  },
} as const;

export type ThemeColors = typeof COLORS.light; 