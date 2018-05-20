import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux'
import './web.scss';

import store from './store';
import App from './App';

const NativeApp = () => (
     (
         <Provider store={store}>
            <App />
        </Provider>
    )
);

AppRegistry.registerComponent('App', () => NativeApp);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
