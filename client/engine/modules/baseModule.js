export class baseModule{
    static lifeCycleModule = true
    constructor(engine) {
        this.engine = engine
        this.id = 'baseModule'
    }
    contextExports() {
        return {}
    }
    attach() {
        console.warn('baseModule attach method not implemented')
    }
    detach() {
        console.warn('baseModule detach method not implemented')
    }
    emit(event, data) {
        this.engine.emit(event, data)
    }
    get context() {
        return this.engine.context
    }
}