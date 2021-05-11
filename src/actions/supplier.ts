import { fetchSinToken, fetchConToken } from '../helpers/fetchApi';
import { types } from '../types/types';
import { ISupplier } from '../reducers/suppliersReducer';
import Swal from 'sweetalert2';



export const startGetAllSuppliers = () => {
    return async (dispatch: any) => {
        const resp = await fetchSinToken('suppliers');
        const suppliers = await resp.suppliers;
        dispatch(getSuppliers(suppliers));
    }
}
const getSuppliers = (suppliers: ISupplier) => ({
    type: types.suppliersGetAll,
    payload: suppliers
})

export const startNewSupplier = (supplier: ISupplier) => {

    return async (dispatch: any) => {
        const resp = await fetchConToken('suppliers/new-supplier', supplier, 'POST');
        if (!resp) {
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if (resp.ok) {
            Swal.fire('Success', 'El proveedor fue creado correctamente', 'success');
            supplier._id = resp.supplier._id;
            supplier.name = resp.supplier.name;
            supplier.description = resp.supplier.description;
            dispatch(saveNewSupplier(supplier))
        }

    }
}

const saveNewSupplier = (supplier: ISupplier) => ({
    type: types.supplierNew,
    payload: supplier
})

export const startUpdateSupplier = (supplier: ISupplier) => {
    return async (dispatch: any) => {

        const resp = await fetchConToken(`suppliers/${supplier._id}`, supplier, 'PUT');
        if (!resp) {
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if (resp.ok) {
            Swal.fire(`Categoria Actualizada`, `La categoria fue actualizada correctamente`, 'success');
            dispatch(updateSupplier(resp.supplier));
        }

    }
}

const updateSupplier = (supplier: ISupplier) => ({
    type: types.supplierUpdate,
    payload: supplier
})

export const startDeleteSupplier = (supplier: ISupplier) => {
    return async (dispatch: any) => {
        const resp = await fetchConToken(`suppliers/${supplier._id}`, supplier, 'DELETE');
        let idSupplier = supplier._id;

        if (!resp) {
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if (resp.ok) {
            Swal.fire('Categoria Eliminada', 'La categoria fue eliminada correctamente', 'success');
            dispatch(deleteSupplier(idSupplier));
        }
    }
}

const deleteSupplier = (supplierId: string) => ({
    type: types.supplierDelete,
    payload: supplierId
})