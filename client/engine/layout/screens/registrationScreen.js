
import { BaseScreenLayout } from "./basicScreenLayout.js";
import { REGISTER_LAYOUT } from "../config/registerConfig.js";

export class RegisterScreen extends BaseScreenLayout {
    constructor(engine, layout) {
        super(engine, layout, "register");
    }

    build(context) {
        this.compile(REGISTER_LAYOUT, context);
    }
}
