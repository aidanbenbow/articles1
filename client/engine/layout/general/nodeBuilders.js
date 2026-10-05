import { buildButtonNode } from "../builders/buttonBuilder.js";
import { buildCardNode } from "../builders/cardBuilder.js";
import { buildCollectionNode } from "../builders/collectionBuilde.js";
import { buildTextNode } from "../builders/textBuilder.js";

export const nodeBuilders = {
    text: buildTextNode,
    button: buildButtonNode,
    card: buildCardNode,
    collection: buildCollectionNode
    
}