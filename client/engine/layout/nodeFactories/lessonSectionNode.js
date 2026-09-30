export function createLessonSectionNode({
    id,
    owner = null,
    sectionId = null,
    x,
    worldY,
    width,
    height = 0,
    color = null,
    children = []
}) {
    return {
        id,
        owner,
        sectionId,
        x,
        worldY,
        width,
        height,
        color,

        type: 'lessonSection',
        kind: 'lessonSection',
        sectionType: 'lesson',

        interactive: false,

        children
    }
}