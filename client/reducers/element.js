const SET_TEXT = 'element/SET_TEXT';
const SET_FONTSIZE = 'element/SET_FONTSIZE';
const SET_ALIGN = 'element/SET_ALIGN';
const SET_FILLMODE = 'element/SET_FILLMODE';
const SET_STYLE = 'element/SET_STYLE';
const SET_COLOR = 'element/SET_COLOR';
const SET_POSITION = 'element/SET_POSITION';
const SET_SCALE = 'element/SET_SCALE';
const SET_ROTATION = 'element/SET_ROTATION';

const UPDATE_ELEMENT = 'element/UPDATE';


export const ALIGN_CENTER = 'ALIGN_CENTER';
export const ALIGN_LEFT = 'ALIGN_LEFT';
export const ALIGN_RIGHT = 'ALIGN_RIGHT';

export const FILLMODE_NONE = 'FILLMODE_NONE';
export const FILLMODE_FILL = 'FILLMODE_FILL';
export const FILLMODE_ALPHA = 'FILLMODE_ALPHA';
export const FILLMODE_BUTTON = 'FILLMODE_BUTTON';
export const FILLMODE_SHADOW = 'FILLMODE_SHADOW';

export const TEXTSTYLE_CLASSIC = 'TEXTSTYLE_CLASSIC';
export const TEXTSTYLE_STRONG = 'TEXTSTYLE_STRONG';
export const TEXTSTYLE_TYPEWRITER = 'TEXTSTYLE_TYPEWRITER';

const initialState = {
    text: '',
    fontSize: 1.8,
    align: ALIGN_CENTER,
    fill: FILLMODE_NONE,
    style: TEXTSTYLE_CLASSIC,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
};

export const updateElement = (element) => ({
    type: UPDATE_ELEMENT,
    payload: element,
});

export default function main(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ELEMENT:
      state = {
        ...state,
        ...action.payload,
      };
      break;
  }
  return state;
}




