export const animationDefinitions = {
    quizAnswer: {
        duration: 1400,
        easing: t => 1 - Math.pow(1 - t, 3)
    },

    surveyAnswer: {
        duration: 400,
        easing: t => 1 - Math.pow(1 - t, 3)
    },

    surveyResults: {
        duration: 500,
        easing: t => t
    },

    sectionComplete: {
        duration: 300,
        easing: t => t
    },
    screenTransition: {
    duration: 190,
    easing: t => 1 - Math.pow(1 - t, 3)
}
}