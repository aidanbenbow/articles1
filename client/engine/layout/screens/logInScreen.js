
import { BaseScreenLayout } from "./basicScreenLayout.js";
import { LOGIN_LAYOUT } from "../config/loginConfig.js";

export class LoginScreen extends BaseScreenLayout {
    constructor(engine, layout) {
        super(engine, layout, "login");
    }

    build(context) {
        this.compile(LOGIN_LAYOUT, context);
    }
}
