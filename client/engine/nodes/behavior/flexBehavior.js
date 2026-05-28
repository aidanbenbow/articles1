import { Behavior } from "./behavior.js";
import { measureFlex, layoutFlex } from "../../modules/flexLayoutEngine.js";
import { rectangle } from "../render/helpers.js";

export class FlexBehavior extends Behavior {
    static handlesChildrenMeasurement = true;
    measure(node,constraints, ctx) {
       
        return measureFlex({
            node: node,
            constraints,
            getNode: ctx.getNode,
            measureNode: ctx.measureNode
        });
    }

    layout(node,measured, rect, ctx) {
        
        return layoutFlex({
            node: node, 
            measured,
            rect,
            getNode: ctx.getNode,
            getMeasured: ctx.getNodeMeasured,
        
        });
    }

    render(ctx, runtime) {
        
        rectangle( ctx, runtime);
    }
}

// import { layoutFlex, measureFlex } from "../../modules/flexLayoutEngine.js"
// import { rectangle } from "../render/helpers.js"
// import { Behavior } from "./behavior.js"

// export class FlexBehavior extends Behavior {
//     measure(constraints, ctx) {
//         return measureFlex({
//             node: this.node,
//             constraints,
//             getNode: ctx.getNode,
//             measureNode: ctx.measureNode,
//         })
//     }
   
//     layout(measured,rect, context) {
//       return  layoutFlex({
//         node: this.node,
//         rect,
//         children: this.node.children,
//         getMeasured: (childId) => context?.getNodeMeasured?.(childId),
//             getNode: (childId) => context?.getNode?.(childId),
//         setLayout: (childId, childRect) => context?.setNodeLayout?.(childId, childRect),
//       }

//         )

//         }
//         render(ctx, runtime) {
//             rectangle(this.node, ctx, runtime)
//         }
//     }