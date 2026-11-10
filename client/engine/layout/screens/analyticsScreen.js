
import { ANALYTICS_LAYOUT } from "../config/analyticsConfig.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"

export class AnalyticsScreen extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'analytics')
    }

    build(context) {
        this.compile(ANALYTICS_LAYOUT, context)
    }
}