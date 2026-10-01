export function createLessonHeaderNode({
    id,
    owner = null,
    x,
    worldY,
    width,
    height = 80,
    sectionId = null
}) {
    return {
        id,
        owner,
        sectionId,

        x,
        worldY,
        width,
        height,

        type: 'lessonHeader',
        kind: 'lessonHeader',
        sectionType: 'lessonHeader',

        interactive: false,

        children: []
    }
}