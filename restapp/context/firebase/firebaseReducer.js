import {OBTENER_PRODUCTOS} from '../../types/index';
export default (state, action)=>{
    switch(action.type){
        case OBTENER_PRODUCTOS:
        return{
            ...state,
            menu: action.payload
        }
        default:
            return state;
    }
}