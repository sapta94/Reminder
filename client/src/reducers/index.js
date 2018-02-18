import {combineReducers} from 'redux';
import authReducer from './authReducer'
import notiReducer from './notiReducer'
import updateReducer from './updateReducer'
import registerReducer from './registerReducer'
import picReducer from './picReducer'
import deleteReducer from './deleteReducer'
//import {reducer as reduxForm} from 'redux-form'

export default combineReducers({
    auth:authReducer,
    noti:notiReducer,
    upNoti:updateReducer,
    regUser:registerReducer,
    proPic:picReducer,
    deleteNoti:deleteReducer
})