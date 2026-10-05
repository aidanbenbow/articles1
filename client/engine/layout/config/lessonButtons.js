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
        action: 'finishLesson',
        kind: 'lessonButton',
        sectionType: 'finishButton'
    },

    back: {
        text: 'Back',
        action: 'goBack',
        kind: 'lessonButton',
        sectionType: 'backButton'
    }
}