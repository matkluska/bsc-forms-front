import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'

import api from './middleware/api';
import reducers from './reducers/reducers'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

export default createStoreWithMiddleware(reducers);
