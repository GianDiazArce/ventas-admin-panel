import { fetchConToken } from '../helpers/fetchApi';
import Swal from 'sweetalert2';
import { ISales, IDetailSales } from '../reducers/salesReducer';
import { types } from '../types/types';
// import { IProduct } from '../reducers/productReducer';

export const startGetAllSales = () => {
    return async(dispatch: any) => {
        const resp = await fetchConToken('sales', null, 'GET');
        // console.log(resp);
        if(!resp){
            Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
        }
        if(resp.ok){
            dispatch(getAllSales(resp.sales))
        }
    }
}

const getAllSales = (sales: ISales) => ({
    type: types.salesGetAll,
    payload: sales,
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
        // product.
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
   
}

export const startNewSale = (shopCart: IDetailSaleFetch[], total: any, userId: string, place: string) => {
    return async (dispatch:any) => {
        let paramsSales = {
            total_price: total,
            place: place==='' ? 'Local Comas': place,
            user: userId,
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
                    Swal.fire('Error', 'Hubo un error con la informacion del servidor, por favor contacte con un administrador', 'error');
                }
            }
            dispatch(salesClearShopCart());
            // console.log(saleResp);
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