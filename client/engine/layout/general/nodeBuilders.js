import { buildButtonNode } from "../builders/buttonBuilder.js";
import { buildCardNode } from "../builders/cardBuilder.js";
import { buildCollectionNode } from "../builders/collectionBuilde.js";
import { buildDragDropNode } from "../builders/dragDropNodeBuilder.js";
import { buildDragDropParagraphNode } from "../builders/dragDropParagraphBuilder.js";
import { buildDynamicSectionNode } from "../builders/dynamicSectionBuilder.js";
import { buildLessonHeaderNode } from "../builders/lessonHeaderBuilder.js";

import { buildLessonNavigationNode } from "../builders/lessonNavigationBuilder.js";
import { buildLessonResultsNode } from "../builders/lessonResultsBuilder.js";
import { buildNameInputNode } from "../builders/nameInputNodeBuilder.js";
import { buildOrderingItemNode } from "../builders/orderingItemBuilder.js";
import { buildOrderingNode } from "../builders/orderingNodeBuilder.js";
import { buildQuizOptionNode } from "../builders/quizOptionBuilder.js";
import { buildSurveyOptionNode } from "../builders/surveyOptionBuilder.js";

import { buildTextNode } from "../builders/textBuilder.js";

export const nodeBuilders = {
    text: buildTextNode,
    heading: buildTextNode,
    paragraph: buildTextNode,
    button: buildButtonNode,
    nameInput: buildNameInputNode,
    card: buildCardNode,
    collection: buildCollectionNode,
quizOption: buildQuizOptionNode,
surveyOption: buildSurveyOptionNode,
    lessonHeader: buildLessonHeaderNode,
    lessonNavigation: buildLessonNavigationNode,
    dynamicSection: buildDynamicSectionNode,

    dragDropWord: buildDragDropNode,
    dragDropParagraph: buildDragDropParagraphNode,

    ordering: buildOrderingNode,
    orderingItem: buildOrderingItemNode,

    lessonResults: buildLessonResultsNode
    
}