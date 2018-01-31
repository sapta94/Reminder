import axios from 'axios'
import {FETCH_USER} from './types'
import {VALID_USER} from './types'

export const fetchUser = () => {

    return async function(dispatch){
        const res = await axios.get('/api/currentUser')
        dispatch({type: FETCH_USER,payload:res.data})
    }
}

export const loginUser = (username,password) => {
    console.log(username+'******'+password)
    return async function(dispatch){
        const res = await axios({
                    method: 'post',
                    url: '/api/login',
                    crossDomain: true,
                    data: {
                        username: username,
                        password: password
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                });
        dispatch({type: 'VALID_USER',payload:res.data})
    }
}

export const registerUser=(firstname,lastname,password) => {
    return async function(dispatch){
        const res = await axios.post('/api/register', {
            firstname: firstname,
            lastname:lastname,
            password: password
          })
        dispatch({type: 'REGISTER_USER',payload:res.data})
    }
}

export const fetchNoti = (userid) => {
    
        return async function(dispatch){
            const res = await axios.get('/api/fetch/noti?userID='+userid)
            dispatch({type: 'FETCH_NOTI',payload:res.data})
        }
    }

export const insertNoti = ( title, description, notifyTime) => {
    return async function(dispatch){
        const res = await axios({
                        method: 'post',
                        url: '/api/insert/noti',
                        crossDomain: true,
                        data: {
                            title: title,
                            description: description,
                            notifyTime:notifyTime
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    });
        dispatch({type: 'INSER_NOTI',payload:res.data})
    }
}

export const updateNoti = ( title, description, notifyTime) => {
    return async function(dispatch){
        const res = await axios({
                        method: 'post',
                        url: '/api/update/noti',
                        crossDomain: true,
                        data: {
                            title: title,
                            description: description,
                            notifyTime:notifyTime
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    });
        dispatch({type: 'UPDATE_NOTI',payload:res.data})
    }
}

