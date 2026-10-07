import { LESSON_LAYOUT } from "./config/lessonConfig.js"
import { compileLayout } from "./general/compileLayout.js"

export class LessonLayout {
    constructor(engine,layout) {
        this.engine = engine
        this.layout = layout
    }
    build(context){
        const {articleNodes,appState} = context
        const articleNode = articleNodes.find(node => node.props?.articleData?.articleId === appState.activeLessonId)
        if(!articleNode) return
        const lesson = this.engine.context.getLesson()
        if(!lesson) return

        compileLayout(
            LESSON_LAYOUT,
            {
                ...context,
                articleNode,
                lesson,
                owner: 'lesson'
            }
        )
        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )
    }
}