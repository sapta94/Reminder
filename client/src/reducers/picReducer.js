export default function (state=null,action) {
    //console.log(action)
    switch(action.type){
        case 'PRO_PIC':
            //console.log('PIC is '+action.payload.data)
            return action.payload.data||false
        case 'INSERT_IMG':
            return action.payload.resData||false
        default :
            return state
    }
}