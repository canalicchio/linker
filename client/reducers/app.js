const OPEN_TEXT_SETTINGS = 'app/OPEN_TEXT_SETTINGS';
const OPEN_BACKGROUND_SETTINGS = 'app/OPEN_BACKGROUND_SETTINGS';
const OPEN_LINK_SETTINGS = 'app/OPEN_LINK_SETTINGS';
const CLOSE_SETTINGS = 'app/CLOSE_SETTINGS';
const SET_SHOW_MENU = 'app/SET_SHOW_MENU';
const TOGGLE_SHOW_MENU = 'app/TOGGLE_SHOW_MENU';
const SELECT_ELEMENT = 'app/SELECT_ELEMENT';


const initialState = {
    linkSettingsActive: false,
    backgroundSettingsActive: false,
    textSettingsActive: false,
    showMenu: true,
    selectedElement: null,
};

export const openTextSettings = (payload) => ({
    type: OPEN_TEXT_SETTINGS,
});
export const openBackgroundSettings = (payload) => ({
    type: OPEN_BACKGROUND_SETTINGS,
});
export const openLinkSettings = (payload) => ({
    type: OPEN_LINK_SETTINGS,
});
export const closeSettings = (payload) => ({
    type: CLOSE_SETTINGS,
});
export const setShowMenu = (showMenu) => ({
    type: SET_SHOW_MENU,
    payload: {
        showMenu,
    },
});
export const toggleShowMenu = () => ({
    type: TOGGLE_SHOW_MENU,
});
export const selectElement = (element) => ({
    type: SELECT_ELEMENT,
    payload: {
        element,
    },
});


export default function main(state = initialState, action) {
    switch (action.type) {
        case OPEN_TEXT_SETTINGS:
            state = {
                ...state,
                linkSettingsActive: false,
                backgroundSettingsActive: false,
                textSettingsActive: true,
            };
        break;
        case OPEN_BACKGROUND_SETTINGS:
            state = {
                ...state,
                linkSettingsActive: false,
                backgroundSettingsActive: true,
                textSettingsActive: false,
            };
        break;
        case OPEN_LINK_SETTINGS:
            state = {
                ...state,
                linkSettingsActive: true,
                backgroundSettingsActive: false,
                textSettingsActive: false,
            };
        break;
        case CLOSE_SETTINGS:
            state = {
                ...state,
                linkSettingsActive: false,
                backgroundSettingsActive: false,
                textSettingsActive: false,
            };
        break;
        case SET_SHOW_MENU:
            state = {
                ...state,
                showMenu: action.payload.showMenu,
            };
        break;
        case TOGGLE_SHOW_MENU:
            state = {
                ...state,
                showMenu: !state.showMenu,
            };
        break;
        case SELECT_ELEMENT:
            state = {
                ...state,
                selectedElement: action.payload.element,
            };
        break;
    }
    return state;
}


