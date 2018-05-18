const TILT = 'device/TILT';

const initialState = {
    tiltX: 0,
    tiltY: 0,
};

export const tilt = (x,y) => ({
    type: TILT,
    payload: {
        x,
        y,
    },
});

export default function main(state = initialState, action) {
  switch (action.type) {
    case TILT:
      state = {
        tiltX: action.payload.x,
        tiltY: action.payload.y,
      };
      break;
  }
  return state;
}
