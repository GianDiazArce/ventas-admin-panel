import { types } from '../types/types';
import { ICategory } from '../reducers/categoriesReducer';
import { fetchSinToken } from '../helpers/fetchApi';



export const getAllCategories = () => {
    return async(dispatch:any) => {

        console.log('hola')
        const resp = await fetchSinToken();
        const categories = await resp.categories;
        console.log(categories);
        dispatch( getCategories( categories ) );


    }
}

const getCategories = (categories:ICategory) => ({
    type: types.catGetAll,
    payload: categories
})

