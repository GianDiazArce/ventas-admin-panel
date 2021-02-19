import { types } from "../types/types";


const initialState = {
    modalOpen: false,
    sidebarOpen: false,
}

/* 
    Observaciones: 
        - Obtener el modalOpen y abrirlo de acuerdo a ese valor
*/

export const uiReducer = ( state = initialState, action:any ) => {
    switch (action.type) {
        case types.uiOpenModal:
            return{
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiOpenSidebar:
            return {
                ...state,
                sidebarOpen: true
            }
    
        case types.uiCloseSidebar:
            return {
                ...state,
                sidebarOpen: false
            }
    
        default:
            return state;
    }
}