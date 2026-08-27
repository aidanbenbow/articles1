import { renderSurveySingleChoice } from "./surveySingleChoice.js"

export function renderSurvey(ctx, section,state, viewport, lesson) {

    switch (section.surveyType) {

        case 'single':
            renderSurveySingleChoice(ctx, section,state, viewport, lesson)
            break

        case 'multiple':
            renderSurveySingleChoice(ctx, section,state, viewport, lesson)
            break

       
    }
}