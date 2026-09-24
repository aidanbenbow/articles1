import { renderSurveySingleChoice } from "./surveySingleChoice.js"

export function renderSurvey(ctx, section,state, viewport, lesson, assetManager, animations, surveys) {

    switch (section.surveyType) {

        case 'single':
            renderSurveySingleChoice(ctx, section,state, viewport, lesson, assetManager, animations, surveys)
            break

        case 'multiple':
            renderSurveySingleChoice(ctx, section,state, viewport, lesson, assetManager, animations, surveys)
            break

       
    }
}