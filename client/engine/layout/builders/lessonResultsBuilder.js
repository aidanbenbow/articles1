import { lessonButtons } from "../config/lessonButtons.js";
import { createButtonNode } from "../nodeFactories/buttonNode.js";
import { createCardNode } from "../nodeFactories/cardNode.js";

export function buildLessonResultsNode(config, context) {
    const {
        layout,
        metrics,
        lesson,
        articleNode,
        currentY
    } = context;

    if (!lesson) return null;

    const results = lesson.getResults();

    const x = config.x ?? metrics.padding;
    const width = config.width ?? metrics.contentWidth;
    const padding = config.padding ?? metrics.button.padding;

    const buttonHeight = metrics.button.height;

    const contentHeight = config.contentHeight ?? 220;
    const gap = metrics.button.gap;

    const button = createButtonNode({
        id: `${articleNode.id}-results-home-button`,
        x: x + padding,
        owner: config.owner ?? 'lesson',
        worldY: currentY + contentHeight,
        width: width - padding * 2,
        height: buttonHeight,
        padding: metrics.button.padding,
        text: lessonButtons.back.text,
        action: lessonButtons.back.action,
        kind: lessonButtons.back.kind,
        sectionType: lessonButtons.back.sectionType,
        type: 'button'
    });

    const children = {
        homeButton: button
    };

    const height = contentHeight + buttonHeight + gap + padding * 2;

    const node = createCardNode({
        id: config.id,
        owner: config.owner ?? 'lesson',
        type: 'lessonResults',
        x,
        worldY: currentY,
        width,
        height,
        padding,
        kind: 'lessonResults',
        sectionType: 'lessonResults',
        children,
        results
    });

    layout.layoutNodes.set(node.id, node);
    layout.layoutNodes.set(button.id, button);

    return {
        node,
        currentY: currentY + height
    };
}