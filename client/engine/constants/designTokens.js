// designTokens.js

export const DESIGN_TOKENS = {
  dimensions: {
    padding: 20,
    articleWidth: 600,
    inputGap: 80,
    buttonGap: 160,
    minPadding: 12,
    maxPadding: 32,
    minContentWidth: 280,
    spacingY: 20,
    marginTop: 20,

    breakpoints: {
      compact: 420,
      mobile: 520,
      tablet: 768,
    },
  },

  colors: {
    surface: "#ffffff",
    border: "#e5e7eb",

    accent: "#9481ed",
    accentLight: "#f0eefc",
    primary: "#9481ed",
    primaryText: "#ffffff",

    heading: "#171717",
    text: "#4b5563",
    muted: "#6b7280",
    sectionHeading: "#374151",

    success: "#b8f5b8",
    error: "#f5b8b8",

    statBackground: "#f9fafb",
    shadow: "rgba(0, 0, 0, 0.08)",
  },

  buttonStyles: {
    default: {
      background: "#9481ed",
      text: "#ffffff",
      radius: 8,
    },

    disabled: {
      background: "#d1d5db",
      text: "#6b7280",
      radius: 8,
    },
  },

  typography: {
    family: "sans-serif",

    eyebrow: {
      size: 11,
      lineHeight: 16,
      weight: 600,
    },

    heading: {
      size: 18,
      lineHeight: 24,
      weight: 600,
    },

    paragraph: {
      size: 14,
      lineHeight: 20,
      weight: 400,
    },

    title: {
      size: 26,
      lineHeight: 32,
      weight: 700,
    },

    sectionHeading: {
      size: 14,
      lineHeight: 20,
      weight: 600,
    },

    body: {
      size: 18,
      lineHeight: 25,
      weight: 500,
    },

    step: {
      size: 16,
      lineHeight: 18,
      weight: 400,
    },

    question: {
      size: 14,
      lineHeight: 20,
      weight: 400,
    },

    button: {
      size: 16,
      lineHeight: 20,
      weight: 600,
    },

    weights: {
      regular: 400,
      medium: 600,
      bold: 700,
    },
  },
};