
import { BaseScreenLayout } from "./basicScreenLayout.js";
import { VERIFY_EMAIL_LAYOUT } from "../config/verifyEmailConfig.js";

export class VerifyEmailScreen extends BaseScreenLayout {
    constructor(engine, layout) {
        super(engine, layout, "verifyEmail");
    }

    build(context) {
        this.compile(VERIFY_EMAIL_LAYOUT, context);
    }
}
