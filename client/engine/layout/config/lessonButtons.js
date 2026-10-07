// lessonButtons.js

export const lessonButtons = {
    start: {
        text: 'Start',
        action: 'startLessonPhase',
        kind: 'lessonStartButton',
        sectionType: 'startButton'
    },

    continue: {
        text: 'Continue',
        action: 'advanceLessonSection',
        kind: 'lessonButton',
        sectionType: 'continueButton'
    },

    finish: {
        text: 'Finish',
        action: 'finishLessonSection',
        kind: 'lessonButton',
        sectionType: 'finishButton'
    },

    back: {
        text: 'Back',
        action: 'goHome',
        kind: 'lessonButton',
        sectionType: 'backButton'
    }
}