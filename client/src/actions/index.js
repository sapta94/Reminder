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
            dispatch({type: 'LOGIN',payload:res.data})
    }
}

export const registerUser=(firstname,lastname,password,email,picID) => {
    return async function(dispatch){
        const res = await axios.post('/api/register', {
            firstname: firstname,
            lastname:lastname,
            password: password,
            email:email,
            picID:picID
          })
        dispatch({type: 'REGISTER_USER',payload:res.data})
    }
}

export const fetchNoti = () => {
    
        return async function(dispatch){
            const res = await axios.get('/api/fetch/noti')
            dispatch({type: 'FETCH_NOTI',payload:res.data})
        }
    }

    export const profileImg = () => {
        
            return async function(dispatch){
                const res = await axios.get('/api/fetch/photo')
                dispatch({type: 'PRO_PIC',payload:res.data})
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
        dispatch({type: 'INSERT_NOTI',payload:res.data})
    }
}

export const updateNoti = ( title,notiID, description, notifyTime) => {
    return async function(dispatch){
        const res = await axios({
                        method: 'post',
                        url: '/api/update/noti',
                        crossDomain: true,
                        data: {
                            notiID:notiID,
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

export function uploadDocumentRequest({ file, name }) {  
    let data = new FormData();
    data.append('file', file);
    data.append('name', name);

    return async function(dispatch){
        const res = await axios({
                        method: 'post',
                        url: '/api/photo',
                        crossDomain: true,
                        data: data,
                        xhrFields: {
                            withCredentials: true
                        }
                    });
        dispatch({type: 'INSERT_IMG',payload:res.data})
    }
}

export const deleteNoti = (notiID) => {
    return async function(dispatch){
        const res = await axios({
                        method: 'post',
                        url: '/api/delete/noti',
                        crossDomain: true,
                        data: {
                            notiID:notiID,
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    });
        dispatch({type: 'DELETE_NOTI',payload:res.data})
    }
}

