import { fetchConToken, fetchSinToken } from '../helpers/fetchApi';
import Swal from 'sweetalert2';
import { ISales, IDetailSales } from '../reducers/salesReducer';
import { types } from '../types/types';

export const startGetAllSales = () => {
    return async(dispatch: any) => {
        const resp = await fetchConToken('sales', null, 'GET');
        if(!resp){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(resp.ok){
            dispatch(getAllSales(resp.sales))
        }
    }
}

const getAllSales = (sales: ISales[]) => ({
    type: types.salesGetAll,
    payload: sales,
})

export const getSalesByMonthAndYear = (month: string, year: string) => {
    return async(dispatch: any) => {
        dispatch(getSalesFilteredByMonthAndYear({
            year,
            month,
        }))
    }
}
const getSalesFilteredByMonthAndYear = (data: any) => ({
    type: types.saleFilterByMonthAndYear,
    payload: data,
})

export const startGetActiveSale = (saleId: string) => {
    return async (dispatch:any) => {
        const resp = await fetchSinToken(`sales/${saleId}`, null, 'GET');
        if(!resp){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(resp.ok){
            dispatch(getSaleById(resp.sale));
        }
    }
}
const getSaleById = (sale: ISales) => ({
    type: types.saleGetById,
    payload: sale
})

export const startGetDetailsSalesById = (saleId: string) => {
    return async (dispatch:any) => {
        const resp = await fetchConToken(`sale-details/getSales/${saleId}`, null, 'GET');
        if(!resp){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(resp.ok){
            dispatch(getDetailsSalesById(resp.detail))
        }
    }
}

const getDetailsSalesById = (DetailsSale : IDetailSales) => ({
    type: types.detailsSaleBySaleId,
    payload: DetailsSale,   
})

export const startAddItemShopCart = (product: any) => {
    return async (dispatch:any) => {
        
        if(!product._id || product._id === undefined){
            return ;
        }
        product.quantity = 0;
        product.price_sale = 0;
        product.total_price = 0;
        dispatch(addItemShopCart(product))
    }
}

const addItemShopCart = (product: any) => ({
    type: types.salesAddItemShopCart,
    payload: product
})

export const deleteItemShopCart = (id: string) => ({
    type: types.salesDeleteItemShopCart,
    payload: id
})

export const startChangeValuesShopCart = (value: number, id: string, type: string) => {
    return async (dispatch:any) => {
        if(type === 'quantity'){
            let productState = {
                value: value,
                id: id,
            };
            dispatch(changeDiscountValue(productState));
        } else if(type === 'price_sale'){
            let productState = {
                value: value,
                id: id,
            };
            dispatch(changePriceSaleValue(productState));
        } else {
            console.log('Esa opción no es valida')
        }
    }
}

const changeDiscountValue = (value: any) => ({
    type: types.salesQuantityShopCartEdit,
    payload: value,
})
const changePriceSaleValue = (value: any) => ({
    type: types.salesPriceSaleShopCartEdit,
    payload: value,
})

export const salesClearShopCart = () => ({
    type: types.salesClearShopCart,
})

interface IDetailSaleFetch{
    _id: string,
    quantity: number,
    price_sale: number,
    price_cost: number,
}

export const startNewSale = (shopCart: IDetailSaleFetch[], total: any, userId: string, place: string, totalGain: number) => {
    return async (dispatch:any) => {
        const gained = total - totalGain
        let paramsSales = {
            total_price: total,
            place: place==='' ? 'Local Comas': place,
            user: userId,
            gained,
        }
        // if place empty = local comas
        const saleResp = await fetchConToken('sales/new-sale', paramsSales, 'POST');
        if(!saleResp){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(saleResp.ok){
            
            for (let i = 0; i < shopCart.length; i++) {
                const respDetailSale = await fetchConToken(
                    'sale-details/add',
                    {
                        sale: saleResp.sale._id,
                        product: shopCart[i]._id,
                        quantity: shopCart[i].quantity,
                        price_sale: shopCart[i].price_sale,
                    }, 'POST');
                if(!respDetailSale){
                    Swal.fire('Error', 'Hubo un error con la peticion detail sale del servidor, por favor contacte con un administrador', 'error');
                }
                const updateStockResp = await fetchConToken(
                    `products/stock/${shopCart[i]._id}`,
                    {
                        stock: shopCart[i].quantity,
                    },
                    'POST'
                );
                if(!updateStockResp){
                    Swal.fire('Error', 'Hubo un error con la peticion update stock del servidor, por favor contacte con un administrador', 'error');
                }
            }
            dispatch(salesClearShopCart());
            dispatch(newSale(saleResp.sale))
            Swal.fire('Success', 'La venta fue creada', 'success');
        }
    }
}
const newSale = (sale: ISales) => ({
    type: types.saleAddNew,
    payload: sale,
})


export const startDeleteSaleAndDetails = (saleId: string) => {

    return async (dispatch:any) => {
        const deleteDetailsBySaleId = await fetchConToken(`sale-details/deleteBySale/${saleId}`, null, 'DELETE');
        if(!deleteDetailsBySaleId){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(deleteDetailsBySaleId.ok){
            const deleteSale = await fetchConToken(`sales/${saleId}`, null, 'DELETE');
            if(!deleteSale){
                Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
            }
            if(deleteSale.ok){
                dispatch( deleteSaleById(saleId) );
                Swal.fire('Success', 'La venta fue eliminada correctamente', 'success');
            }
        }
    }
}

const deleteSaleById = (id: string) => ({
    type: types.saleDelete,
    payload: id,
})

export const startSaleChangeStatus = (status: string, saleId: string) => {
    return async (dispatch:any) => {
        const resp = await fetchConToken(`sales/${saleId}`, {status}, 'PUT');
        // console.log(resp)
        if(!resp){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(resp.ok){
            dispatch(saleChangeStatus(resp.sale));
            Swal.fire('Success', 'El estado fue cambiado correctamente', 'success');
        }
    }
}

const saleChangeStatus = (sale: ISales) => ({
    type: types.saleChangeStatus,
    payload: sale,
})

export const returnStockProduct = (detailsSale: IDetailSales[]) => {
    return async (dispatch:any) => {
        for (let i = 0; i < detailsSale.length; i++) {
            const resp = await fetchConToken(`products/devolver-stock/${detailsSale[i].product._id}`, {
                stock: detailsSale[i].quantity
            }, 'POST');
            if(!resp){
                Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
            }
            
        }
    }
}