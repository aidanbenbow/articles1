export const DRAG_DROP_LAYOUT = {
    id: 'drag-drop',
    type: 'card',
    
    
    kind: 'dragDrop',
    sectionType: 'dragDrop',
    padding: ({metrics})=>metrics.dragDrop.padding,
    style:{
        radius:8,
        shadowBlur: 4,
        shadowOffsetX: 0,
        borderWidth: 1,
    },
children: [
    {
        id: 'instruction',
        type: 'text',
        kind: 'lessonSection',
        sectionType: 'dragDrop',
        typography: 'step',
        color: '#000',
        value: ({section})=>section.instruction,
        
    },
    {
        id: 'wordbank',
        type: 'collection',
        source: ({activity})=>activity.getWordbank(),
        layout:{
            mode: 'wrap',
            gap: ({metrics})=>metrics.dragDrop.wordBankGap,
            rowGap:12
        },
        item: {
            type: 'dragDropWord',
            kind: 'lessonSection',
            sectionType: 'dragDropWord',
            text: ({item})=>item,
            wordIndex: ({index})=>index,
            dragDropId: ({section})=>section.id,
            height: ({metrics})=>metrics.dragDrop.wordHeight,
            color: '#23979d'
    }
},
{
    id: 'paragraphs',
    type: 'collection',
    source: ({section})=>section.paragraphs??[],
    layout:{
        gp: ({metrics})=>metrics.dragDrop.paragraphGap,
    },
    item: {
        type: 'dragDropParagraph',
        kind: 'lessonSection',
        sectionType: 'dragDropParagraph',
        paragraphIndex: ({index})=>index,
        paragraph: ({item})=>item,
        answers:({activity})=>activity?.getAnswers()??{},
        dragDropId: ({section})=>section.id,
       
}},
{
    id: 'check',
    type: 'button',
    kind: 'lessonSection',
    sectionType: 'dragDrop',
    text: 'Check Answers',
    action: 'checkDragDrop',
    dragDropId: ({section})=>section.id,
    width: 120,
    height: ({metrics})=>metrics.dragDrop.checkButtonHeight,
},
{
    id: 'feedback',
    type: 'text',
    kind: 'lessonSection',
    sectionType: 'dragDrop',
    typography: 'step',
    color: '#000',
    value: ({activity})=>activity?.getFeedback()??'',
    visible:({activity})=>activity?.getChecked?.()===true,
    height: ({metrics})=>metrics.dragDrop.feedbackHeight,
}
]
}