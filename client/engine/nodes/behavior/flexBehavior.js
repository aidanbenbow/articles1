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

