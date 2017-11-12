import {combineReducers} from 'redux'
import auth from './auth_reducer'
import registration from './register_reducer'
import listForms from './list_forms_reducer'
import saveForm from './save_form_reducer'
import getForm from './get_form_reducer'
import deleteForm from './delete_form_reducer'
import getStats from './get_stats_reducer'
import addReply from './add_reply_reducer'

export default combineReducers({
  auth,
  registration,
  listForms,
  saveForm,
  getForm,
  deleteForm,
  getStats,
  addReply
})
