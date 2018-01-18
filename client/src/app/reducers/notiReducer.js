export default function (state=null,action) {
    //console.log(action)
    switch(action.type){
        case 'FETCH_NOTI':
            console.log(action.payload)
            // if(action.payload.message=='success'){
            //     window.location.href='/reminders'
            // }
            return action.payload||false

        default :
            return state
    }
}