import {FETCH_USER} from '../actions/types'

export default function (state=null,action) {
    //console.log(action)
    switch(action.type){
        case '':
        if(action.payload.message=='success'){
            window.location.href="/login"
        }
        return action.payload||false
        case 'VALID_USER':
            console.log(action.payload)
            // if(action.payload.message=='success'){
            //     window.location.href='/reminders'
            // }
            return action.payload||false

        case FETCH_USER:
            console.log(action.payload)
            return action.payload||false
        default :
            return state
    }
}