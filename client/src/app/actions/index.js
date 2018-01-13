import axios from 'axios'
import {FETCH_USER} from './types'
import {VALID_USER} from './types'

export const fetchUser = () => {

    return async function(dispatch){
        const res = await axios.get('http://localhost:5000/api/currentUser')
        dispatch({type: FETCH_USER,payload:res.data})
    }
}

export const loginUser = (username,password) => {
    console.log(username+'******'+password)
    return async function(dispatch){
        const res = await axios.post('http://localhost:5000/api/login', {
            username: username,
            password: password
          })
        dispatch({type: 'VALID_USER',payload:res.data})
    }
}

export const registerUser=(firstname,lastname,password) => {
    return async function(dispatch){
        const res = await axios.post('http://localhost:5000/api/register', {
            firstname: firstname,
            lastname:lastname,
            password: password
          })
        dispatch({type: 'REGISTER_USER',payload:res.data})
    }
}

