import {combineReducers} from 'redux'
import auth from './auth_reducer'
import registration from './register_reducer'
import saveForm from './save_form_reducer'

export default combineReducers({
  auth,
  registration,
  saveForm
})
