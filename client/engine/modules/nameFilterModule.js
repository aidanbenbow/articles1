import { baseModule } from "./baseModule.js";

export class NameFilterModule extends baseModule {
    static moduleName = 'nameFilterModule'
    static lifeCycleModule = true

    constructor(engine) {
        super(engine)
        this.id = 'nameFilterModule'
        this.names = ['ala', 'ana', 'ion', 'maria', 'george', 'ioana', 'mihai', 'andreea']
    }

    attach() {
        this.engine.on('nameFilterChanged', this._onNameFilterChanged)
    }

    detach() {
        this.engine.off('nameFilterChanged', this._onNameFilterChanged)
    }

    _onNameFilterChanged = ({ query }) => {
        const q = (query ?? '').trim().toLowerCase()
console.log('Filtering names with query:', q)
        this.names.forEach((name, index) => {
            const nodeId = `name${index}`
            const visible = q === '' || name.toLowerCase().includes(q)

            this.context.updateNode?.(nodeId, node => ({
                ...node,
                props: {
                    ...node.props,
                    uistate: {
                        ...node.props.uistate,
                        hidden: !visible
                    }
                }
            }))
        })

        this.engine.emit('renderRequested')
    }
}