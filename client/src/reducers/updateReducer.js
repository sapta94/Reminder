export default function (state=null,action) {
    //console.log(action)
    switch(action.type){
        case 'UPDATE_NOTI':
            console.log(action.payload)
            if(action.payload.message=='success'){
                 alert('Update Successsful')
                 window.location.href="/reminders"
             }
            return action.payload||false

        default :
            return state
    }
}