import { renderButton } from "../buttons/buttonRenderer.js";
import { renderCard } from "../CardRenderer.js";
import { renderDragDropGap } from "../dragDrop/dragDropGapRenderer.js";
import { renderDragDrop } from "../dragDrop/dragDropRenderer.js";
import { renderDragDropWord } from "../dragDrop/dragDropWordRenderer.js";
import { renderHome } from "../homeRenderer.js";
import { renderOrderingItem } from "../ordering/orderingListRenderer.js";
import { renderOrdering } from "../ordering/orderingRenderer.js";
import { renderSurveyOption } from "../survey/surveyOption.js";
import { renderSurvey } from "../survey/surveyRenderer.js";
import { renderText } from "../TextRenderer.js";

export const nodeRenderers = {
    text: renderText,
    button: renderButton,
    card: renderCard,
    homeWelcome: renderHome,
    ordering: renderOrdering,
    orderingItem: renderOrderingItem,
    survey: renderSurvey,
    surveyOption: renderSurveyOption,
    dragDrop: renderDragDrop,
    dragDropWord: renderDragDropWord,
    dragDropGap: renderDragDropGap,
}