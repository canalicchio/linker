import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux'

import store from './client/store';
import App from './client/App';

const NativeApp = () => (
     (
         <Provider store={store}>
        <App />
        </Provider>
    )
);

AppRegistry.registerComponent('linker', () => NativeApp);
