import { types } from '../types/types';
import _ from 'lodash'


const initCategoriesState = {
    tableState: {
        column: null,
        direction: null,
    },
    categories: [],
}
export interface ICategory {
    _id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export const categorieReducer = ( state = initCategoriesState, action: any ) => {
    switch (action.type) {
        case types.catGetAll:
            return {
                ...state,
                categories: [...action.payload]
            }
        case types.CHANGE_SORT:
            if (state.tableState.column === action.payload) {
                return {
                    ...state,
                    categories: state.categories.reverse(),
                    tableState:{
                        ...state.tableState,
                        direction: state.tableState.direction === 'ascending' ? 'descending' : 'ascending'
                    }
                }
            }
        
            return {
                ...state,
                categories: _.sortBy(state.categories, [action.payload]),
                tableState:{
                    ...state.tableState,
                    column: action.payload ,
                    direction: 'ascending'
                }
            }
    

        case types.catNew:
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.payload
                ]
            }
        
        case types.catUpdate:
            return {
                ...state,
                categories: state.categories.map( (category:ICategory) =>  (category._id === action.payload._id) ? action.payload : category )
            }

        case types.catDelete:
            return {
                ...state,
                categories: state.categories.filter( (category:ICategory) => (category._id !== action.payload) )
            }

        default:
            return state;
    }

}