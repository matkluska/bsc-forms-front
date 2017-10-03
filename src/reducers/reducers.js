import {combineReducers} from 'redux'
import auth from './auth_reducer'
import registration from './register_reducer'

export default combineReducers({
  auth,
  registration
})
