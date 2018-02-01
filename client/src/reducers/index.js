import {combineReducers} from 'redux';
import authReducer from './authReducer'
import notiReducer from './notiReducer'
import updateReducer from './updateReducer'
import registerReducer from './registerReducer'
//import {reducer as reduxForm} from 'redux-form'

export default combineReducers({
    auth:authReducer,
    noti:notiReducer,
    upNoti:updateReducer,
    regUser:registerReducer
})