export function getLessonIntroLayout(compact) {
    return {
         titleHeight: compact ? 52 : 60,
    descriptionHeight: compact ? 72 : 60,
    statsHeight: 30,
    gap: compact ? 12 : 16,
    statsGap: compact ? 16 : 20
    }
}