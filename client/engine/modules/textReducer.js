export class TextReducer {
    static handle(action, state){
        const { type, payload } = action
        switch(type){
            case 'insertSpace': {
                return {
                    ...state,
                    content: state.content + ' '
                }
            }
                }
    }
}