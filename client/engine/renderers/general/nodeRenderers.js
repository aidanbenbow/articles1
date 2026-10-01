import { renderHeader } from "../../modules/renderUtils.js";
import { renderButton } from "../buttons/buttonRenderer.js";
import { renderCard } from "../CardRenderer.js";
import { renderDragDropGap } from "../dragDrop/dragDropGapRenderer.js";
import { renderDragDrop } from "../dragDrop/dragDropRenderer.js";
import { renderDragDropWord } from "../dragDrop/dragDropWordRenderer.js";
import { renderHome } from "../homeRenderer.js";
import { renderHeading } from "../lesson/headerRenderer.js";
import { renderLessonTitle } from "../lesson/lessonTitleRenderer.js";
import { renderParagraph } from "../lesson/paragraphRenderer.js";
import { renderOrderingItem } from "../ordering/orderingListRenderer.js";
import { renderOrdering } from "../ordering/orderingRenderer.js";
import { renderQuizOption } from "../quiz/quizOption.js";
import { renderQuiz } from "../quiz/quizRenderer.js";
import { renderLessonHeader } from "../renderLessonHeader.js";
import { renderSurveyOption } from "../survey/surveyOption.js";
import { renderSurvey } from "../survey/surveyRenderer.js";
import { renderText } from "../TextRenderer.js";

export const nodeRenderers = {
    text: renderText,
    button: renderButton,
    heading: renderHeading,
    paragraph: renderParagraph,
    lessonTitle: renderLessonTitle,
    lessonHeader: renderLessonHeader,
    card: renderCard,
    homeWelcome: renderHome,
    ordering: renderOrdering,
    orderingItem: renderOrderingItem,
    survey: renderSurvey,
    surveyOption: renderSurveyOption,
    dragDrop: renderDragDrop,
    dragDropWord: renderDragDropWord,
    dragDropGap: renderDragDropGap,
    quiz: renderQuiz,
    quizOption: renderQuizOption
}