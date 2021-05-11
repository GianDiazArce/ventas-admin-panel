import { types } from '../types/types';
import { ICategory } from '../reducers/categoriesReducer';
import { fetchSinToken, fetchConToken } from '../helpers/fetchApi';
import Swal from 'sweetalert2';



export const getAllCategories = () => {
    return async (dispatch: any) => {
        const resp = await fetchSinToken('categories');
        const categories = await resp.categories;
        dispatch(getCategories(categories));


    }
}

export const startNewCategory = (category: ICategory) => {
    return async (dispatch: any) => {
        const resp = await fetchConToken('categories/new-category', category, 'POST');
        if (resp.ok) {
            Swal.fire('Categoria Creada', 'La categoria fue creada exitosamente', 'success');
            category._id = resp.category._id;
            category.name = resp.category.name;

            dispatch(saveNewCategory(category));
        }
    }
}

const saveNewCategory = (category: ICategory) => ({
    type: types.catNew,
    payload: category
})

export const startUpdatedCategory = (category: ICategory) => {
    return async (dispatch: any) => {
        const body = await fetchConToken(`categories/${category._id}`, category, 'PUT');
        if (body.ok) {
            Swal.fire(`Categoria Actualizada`, `La categoria fue actualizada correctamente`, 'success');
            dispatch(updateCategory(body.category));
        } else {
            Swal.fire('Error', 'Ocurrio un error al querer actualizar, Intente de nuevo \nSi el problema persiste contactar a un administrador', 'error');
        }
    }
}

const updateCategory = (category: ICategory) => ({
    type: types.catUpdate,
    payload: category
})

export const startDeleteCategory = (category: ICategory) => {
    return async (dispatch: any) => {
        let idCategory = category._id;
        const body = await fetchConToken(`categories/${category._id}`, null, 'DELETE');
        if (body.ok) {
            Swal.fire('Categoria Eliminada', 'La categoria fue eliminada correctamente', 'success');
            dispatch(deleteCategory(idCategory));
        } else {
            Swal.fire('Error', (body.msg) ? body.msg : 'Hubo un error', 'error');
        }
    }

}
const deleteCategory = (id: string) => ({
    type: types.catDelete,
    payload: id
})


export const changeDirectionSort = (column: string) => ({
    type: types.CHANGE_SORT,
    payload: column
})

const getCategories = (categories: ICategory) => ({
    type: types.catGetAll,
    payload: categories
})

