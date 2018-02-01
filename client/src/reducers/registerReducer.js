export default function (state=null,action) {
    //console.log(action)
    switch(action.type){
        case 'REGISTER_USER':
            console.log(action.payload)
            if(action.payload.message=='success'){
                 alert('Register Successsful')
                 window.location.href="/login"
             }
            return action.payload||false

        default :
            return state
    }
}