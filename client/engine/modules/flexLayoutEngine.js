// --- FLEX MEASUREMENT ----------------------------------------------------

export function measureFlex({
    node,
    constraints,
    measureNode,
    getNode
}) {
    const isRow = node.props.layout.direction === "row";
    const gap = node.props.layout.gap ?? 0;

    const children = node.children ?? [];

    // Phase 1: measure children with loose constraints
    const childInfos = children.map(childId => {
        const child = getNode(childId);

        // Loose constraints for intrinsic measurement
        const loose = {
            width: isRow ? Infinity : constraints.width,
            height: isRow ? constraints.height : Infinity
        };

        const measured = measureNode(child, loose);

        const flexGrow = child.props.layout.flexGrow ?? 0;
        const flexShrink = child.props.layout.flexShrink ?? 1;
        const flexBasis =
            child.props.layout.flexBasis ??
            (isRow ? measured.width : measured.height);

        return {
            id: childId,
            measured,
            flexGrow,
            flexShrink,
            flexBasis
        };
    });

    // Compute intrinsic container size
    const totalBasis =
        childInfos.reduce((s, c) => s + c.flexBasis, 0) +
        gap * Math.max(0, childInfos.length - 1);

    const crossSize = Math.max(
        0,
        ...childInfos.map(c =>
            isRow ? c.measured.height : c.measured.width
        )
    );

    const width = isRow ? totalBasis : crossSize;
    const height = isRow ? crossSize : totalBasis;

    return {
        width,
        height,
        isRow,
        gap,
        children: childInfos
    };
}

// --- FLEX LAYOUT ---------------------------------------------------------

export function layoutFlex({
    node,
    rect,
    measured,
    setLayout
}) {
    const { isRow, gap, children } = measured;

    const mainSize = isRow ? rect.width : rect.height;

    const totalBasis =
        children.reduce((s, c) => s + c.flexBasis, 0) +
        gap * Math.max(0, children.length - 1);

    let remaining = mainSize - totalBasis;
    const totalGrow = children.reduce((s, c) => s + c.flexGrow, 0);

    let cursor = isRow ? rect.x : rect.y;

    for (const item of children) {
        let size = item.flexBasis;

        if (remaining > 0 && totalGrow > 0) {
            size += remaining * (item.flexGrow / totalGrow);
        }

        const childRect = isRow
            ? {
                  x: cursor,
                  y: rect.y,
                  width: size,
                  height: rect.height
              }
            : {
                  x: rect.x,
                  y: cursor,
                  width: rect.width,
                  height: size
              };

        setLayout(item.id, childRect);
        cursor += size + gap;
    }

    return rect;
}


// export function layoutFlex({
//     node,
//     rect,
//     children,
//     getMeasured,
//     getNode,
//     setLayout,
// }){
//     const isRow = node.props.layout.direction === 'row'
//     const gap = node.props.layout.gap ?? 0

//     const items = children.map(childId => {
//         const child = getNode(childId)
//         const m = getMeasured(childId)
//         return { id: childId,
//              flexGrow: child.props.layout.flexGrow ?? 0,
//              flexShrink: child.props.layout.flexShrink ?? 1,
//              flexBasis: child.props.layout.flexBasis != null
//     ? child.props.layout.flexBasis
//     : (isRow ? m.width || 0 : m.height || 0),
             
//         }
//     })
//     const mainSize = isRow ? rect.width : rect.height
// let totalBasis = items.reduce((s, i) => s + i.flexBasis, 0)+ gap * (items.length - 1)

//     let remaing = mainSize - totalBasis
//     const totalGrow = items.reduce((s, i) => s + i.flexGrow, 0)
//     let cursor = isRow ? rect.x : rect.y

//     for(const item of items) {
        
//         let size = item.flexBasis

//         if(remaing > 0 && totalGrow > 0) {
//             size += remaing * (item.flexGrow / totalGrow)
//         }

//         const childRect = isRow ? { x: cursor, y: rect.y, width: size, height: rect.height } : { x: rect.x, y: cursor, width: rect.width, height: size }
//         setLayout(item.id, childRect)
//         cursor += size + gap
//     }
//     return rect
// }

// export function measureFlex({
//     node,
//     constraints,
//     measureNode,
//     getNode
// }){
//     const isRow = node.props.layout.direction === 'row'

//     const children = node.children ?? []
//     const items = children.map(childId => {
//         const child = getNode(childId)
//         const childMeasured = measureNode(child, constraints)
//         return { id: childId, 
//             measured: childMeasured, 
//             flexGrow: child.props.layout.flexGrow ?? 0, 
//             flexShrink: child.props.layout.flexShrink ?? 1, 
//             flexBasis: child.props.layout.flexBasis ?? (isRow ? childMeasured.width : childMeasured.height) }
//     }
//     )

//         return { children: items , isRow }
// }
