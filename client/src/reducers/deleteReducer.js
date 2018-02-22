export default function (state=null,action) {
    //console.log(action)
    switch(action.type){
        case 'DELETE_NOTI':
            console.log(action.payload)
            return action.payload||false

        default :
            return state
    }
}