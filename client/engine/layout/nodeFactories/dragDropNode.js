

export function createDragDropNode(
   {id, sectionId = null, x, worldY, width, height = 40, color = '#23979d', text, padding = 0, action=null, kind = 'dragDrop', sectionType = 'dragDrop', type = 'dragDrop',interactive=false,children = {}, ...extra

   } ){
    return{
        id,
        sectionId,
        x,
        interactive,
        worldY,
        width,
        height,
        color,
        text,
        padding,
        action,
        kind,
        type,
        sectionType,
        selected: false,
        children,
        ...extra

    }
   }