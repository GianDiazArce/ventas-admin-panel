import { types } from '../types/types';
export {}


const initCategoriesState = {
    name: '',
    categories: [],
}
export interface ICategory {
    name: string;
}

export const categorieReducer = ( state = initCategoriesState, action: any ) => {
    // console.log(action);
    switch (action.type) {
        case types.catGetAll:
            return {
                ...state,
                categories: [...action.payload]
            }
    
        default:
            return state;;
    }

}