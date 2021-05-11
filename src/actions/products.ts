import { fetchSinToken, fetchConToken } from '../helpers/fetchApi';
import { IProduct } from '../reducers/productReducer';
import { types } from '../types/types';
import Swal from 'sweetalert2';


export const startGetProducts = () => {
    return async (dispatch: any) => {

        const resp = await fetchSinToken('products', null, 'GET');
        dispatch(getAllProducts(resp.products))

    }
}

const getAllProducts = (products: IProduct) => ({
    type: types.getAllProducts,
    payload: products
})

export const startNewProduct = (product: IProduct, priceCost: any) => {
    return async (dispatch: any) => {

        product.price_cost = priceCost.toFixed(2);
        const resp = await fetchConToken('products/new-product', product, 'POST');
        if (!resp) {
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if (resp.ok) {
            Swal.fire('Success', 'El producto fue creado correctamente', 'success');
            dispatch(newProduct(resp.product));
        }

    }
}

const newProduct = (product: IProduct) => ({
    type: types.productNew,
    payload: product,
})

export const startUpdateProduct = (product: IProduct, priceCost: any) => {

    return async (dispatch: any) => {

        product.price_cost = priceCost.toFixed(2);
        const resp = await fetchConToken(`products/${product._id}`, product, 'PUT');
        if (!resp) {
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if (resp.ok) {
            Swal.fire('Success', 'El producto fue actualizado correctamente', 'success');
            dispatch(updateProduct(resp.product));
        }
    }

}

const updateProduct = (product: IProduct) => ({
    type: types.productUpdate,
    payload: product,
})

export const startDeleteProduct = (product: IProduct) => {

    return async (dispatch: any) => {

        const resp = await fetchConToken(`products/${product._id}`, null, 'DELETE');
        if (!resp) {
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if (resp.ok) {
            Swal.fire('Success', 'El producto fue eliminado correctamente', 'success');
            dispatch(deleteProduct(product._id));
        }
    }

}

const deleteProduct = (id: string) => ({
    type: types.productDelete,
    payload: id
})