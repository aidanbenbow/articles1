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
const filteredIds = this.names
        .map((name, index) => ({ name, id: `name${index}` }))
        .filter(x =>
            q === '' || x.name.toLowerCase().startsWith(q)
        )
        .map(x => x.id)

    this.context.setChildren('containerBar6', filteredIds)

    //    this.names.forEach((name, index) => {
    //         const nodeId = `name${index}`
    //         const visible = q === '' || name.toLowerCase().startsWith(q)

        //     this.context.updateNode?.(nodeId, node => ({
        //         ...node,
        //         props: {
        //             ...node.props,
        //             uistate: {
        //                 ...node.props.uistate,
        //                 hidden: !visible
        //             }
        //         }
        //     }))
        // })
        

        this.engine.emit('renderRequested')
    }
}