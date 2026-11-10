export const ui = {
  space: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  radius: { sm: 8, md: 12 },
  type: { h1: 32, h2: 24, body: 16, meta: 14, lh: 1.45 },
  motion: { fast: 120, normal: 180 },
  color: { bg: '#F7F8FA', card: '#FFFFFF', text: '#1E2430', muted: '#6D7685', primary: '#2F6BFF' }
};

const buttonStyles = {
  default: { fill: ui.color.primary, alpha: 1 },
  hover:   { fill: ui.color.primary, alpha: 0.92 },
  pressed: { fill: ui.color.primary, alpha: 0.84 },
  disabled:{ fill: '#A9B1C1', alpha: 0.7 }
};