import { types } from '../types/types';
export {}

export interface ISupplier {
    _id: string;
    name: string;
    description?:string;
    createdAt?: Date;
    updatedAt?: Date;
}
const initState = {
    suppliers: []
}


export const suppliersReducer = ( state = initState, action:any ) => {

    switch (action.type) {
        case types.suppliersGetAll:
            return {
                ...state,
                suppliers: [...action.payload]
            }
    
        case types.supplierNew:
            return {
                ...state,
                suppliers: [...state.suppliers, action.payload]
            }

        case types.supplierUpdate:
            return {
                ...state,
                suppliers: state.suppliers.map( ( supplier: ISupplier ) => (supplier._id === action.payload._id) ? action.payload : supplier )
            }

        case types.supplierDelete:
            return {
                ...state,
                suppliers: state.suppliers.filter( (supplier: ISupplier) => (supplier._id !== action.payload) )
            }

        default:
            return state;
    }

}