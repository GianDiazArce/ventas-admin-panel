import { types } from '../types/types';

const initProductState = {
    products: [],
}
export interface IProduct {
    _id: string,
    name: string,
    stock: number,
    price_cost: number,
    category: {
        _id: string,
        name: string,
    },
    supplier: {
        _id: string,
        name: string,
    },
}

export const productReducer = ( state = initProductState, action: any ) => {
    
    switch (action.type) {
        case types.getAllProducts:
            return {
                ...state,
                products: [...action.payload]
            }

        case types.productNew:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
    
        case types.productUpdate:
            return {
                ...state,
                products: state.products.map( (product: IProduct) => (product._id === action.payload._id) ? action.payload : product )
            }

        case types.productDelete:
            return{
                ...state,
                products: state.products.filter( (product: IProduct) => product._id !== action.payload )
            }

        default:
            return state;
    }

}