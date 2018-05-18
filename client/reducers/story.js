import elementReducer from './element'

const SET_BACKGROUND_COLOR = 'story/SET_BACKGROUND_COLOR';
const SET_BACKGROUND_IMAGE = 'story/SET_BACKGROUND_IMAGE';
const ADD_ELEMENT = 'story/ADD_ELEMENT';
const REMOVE_ELEMENT = 'story/REMOVE_ELEMENT';
const SORTUP_ELEMENT = 'story/SORTUP_ELEMENT';

const initialState = {
    backgroundColor: '#ffffff',
    backgroundImage: null,
    elements: [],
};


export const setBackgroundColor = (color) => ({
    type: SET_BACKGROUND_COLOR,
    payload: {
        color,
    }
});
export const setBackgroundImage = (imageUrl) => ({
    type: SET_BACKGROUND_IMAGE,
    payload: {
        imageUrl,
    }
});
export const addElement = (element) => ({
    type: ADD_ELEMENT,
    payload: {
        element,
    },
});
export const removeElement = (index) => ({
    type: REMOVE_ELEMENT,
    payload: {
        index,
    },
});
export const sortUp = (index) => ({
    type: SORTUP_ELEMENT,
    payload: {
        index,
    },
});

export default function main(state = initialState, action) {
    switch (action.type) {
        case SET_BACKGROUND_COLOR:
            state = {
            ...state,
            backgroundColor: action.payload.color,
        };
        break;
        case SET_BACKGROUND_IMAGE:
            state = {
            ...state,
            backgroundImage: action.payload.imageUrl,
        };
        break;
        case ADD_ELEMENT:
            state.elements.push(action.payload.element);
            state = {
                ...state,
                elements: state.elements.concat(),
            };
        break;
        case REMOVE_ELEMENT:
            state.elements.splice(action.payload.index, 1);
            state = {
                ...state,
                elements: state.elements.concat(),
            };
        break;
        case SORTUP_ELEMENT:
            let newelements = state.elements.concat();
            let tmp = newelements[action.payload.index];
            newelements.splice(action.payload.index, 1);
            newelements.push(tmp);
            state = {
                ...state,
                elements: newelements,
            };
            break;
    }

    if(action.type.startsWith('element/')) {
        state = {
            ...state,
            elements: [
                ...state.elements.slice(0, action.payload.index),
                elementReducer(state.elements[action.payload.index], action),
                ...state.elements.slice(action.payload.index + 1)
            ],
        };

    }
    return state;
}
