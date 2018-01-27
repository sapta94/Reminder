import {combineReducers} from 'redux';
import authReducer from './authReducer'
import notiReducer from './notiReducer'
//import {reducer as reduxForm} from 'redux-form'

export default combineReducers({
    auth:authReducer,
    noti:notiReducer
})