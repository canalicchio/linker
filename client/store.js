import { combineReducers, createStore } from 'redux';

import appReducer from './reducers/app';
import deviceReducer from './reducers/device';
import storyReducer from './reducers/story';

const rootReducer = combineReducers({
    app: appReducer,
    story: storyReducer,
    device: deviceReducer,
});

const store = createStore(rootReducer);

export default store;
