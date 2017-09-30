import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'

import api from './middleware/api';
import formsApp from './reducers'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

export default createStoreWithMiddleware(formsApp);


