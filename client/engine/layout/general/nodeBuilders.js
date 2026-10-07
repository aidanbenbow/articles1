import { buildButtonNode } from "../builders/buttonBuilder.js";
import { buildCardNode } from "../builders/cardBuilder.js";
import { buildCollectionNode } from "../builders/collectionBuilde.js";
import { buildLessonHeaderNode } from "../builders/lessonHeaderBuilder.js";
import { buildLessonIntroNode } from "../builders/lessonIntroBuilder.js";
import { buildLessonNavigationNode } from "../builders/lessonNavigationBuilder.js";
import { buildLessonSectionNode } from "../builders/lessonSectionBuilder.js";
import { buildTextNode } from "../builders/textBuilder.js";

export const nodeBuilders = {
    text: buildTextNode,
    button: buildButtonNode,
    card: buildCardNode,
    collection: buildCollectionNode,

    lessonHeader: buildLessonHeaderNode,
    lessonSection: buildLessonSectionNode,
    lessonNavigation: buildLessonNavigationNode
    
}