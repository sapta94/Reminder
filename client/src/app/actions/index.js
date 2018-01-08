import axios from 'axios'
import {FETCH_USER} from './types'

export const fetchUser = () => {

    return async function(dispatch){
        const res = await axios.get('http://localhost:5000/api/currentUser')
        dispatch({type: FETCH_USER,payload:res.data})
    }
}

export const loginUser = (username,password) => {
    return async function(dispatch){
        const res = await axios.post('http://localhost:5000/api/login', {
            username: username,
            password: password
          })
        dispatch({type: FETCH_USER,payload:res.data})
    }
}

