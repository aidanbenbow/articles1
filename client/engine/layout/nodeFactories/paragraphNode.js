export function createParagraphNode(id,sectionId,x,worldY,width,height,color,text,padding) {
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
        sectionType: 'lessonParagraph',
        padding
    }
}