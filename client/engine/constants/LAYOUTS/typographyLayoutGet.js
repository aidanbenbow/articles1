// typographyLayoutGet.js

export function getResponsiveTypography(compact, baseTypography) {
  const typography = baseTypography;

  return {
    family: typography.family,

    eyebrow: {
      ...typography.eyebrow,
      size: compact ? 10 : typography.eyebrow.size,
    },

    heading: {
      ...typography.heading,
      size: compact ? 16 : typography.heading.size,
    },

    paragraph: {
      ...typography.paragraph,
    },

    title: {
      ...typography.title,
      size: compact ? 22 : typography.title.size,
    },

    sectionHeading: {
      ...typography.sectionHeading,
    },

    body: {
      ...typography.body,
    },

    step: {
      ...typography.step,
      size: compact ? 11 : typography.step.size,
    },

    question: {
      ...typography.question,
    },

    button: {
      ...typography.button,
    },

    weights: {
      ...typography.weights,
    },
  };
}

