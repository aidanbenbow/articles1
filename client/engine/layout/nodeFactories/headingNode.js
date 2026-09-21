export function createHeadingNode(id,sectionId,x,worldY,width,height,color,text,padding) {
    return {
        id,
        sectionId,
        x,
        worldY,
        width,
        height,
        color,
        text,
        kind: 'lessonSection',
        type: 'text',
        sectionType: 'lessonHeading',
        padding
    }
}