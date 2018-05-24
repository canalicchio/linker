import elementReducer from './element'

const UPDATE_ELEMENT = 'element/UPDATE';


const INITIAL_STATE = [];

const elementCollectionReducer = (state = INITIAL_STATE, action) => {
    if (action.type.startsWith('element/')) {
        state = [
            ...state.slice(0, action.payload.index),
            elementReducer(state[action.payload.index], action.payload),
            ...state.slice(action.payload.index + 1)
        ]
    }
    return state
}

export default elementCollectionReducer;
