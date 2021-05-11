import { types } from '../types/types';
import { IUser } from './authReducer';
import { IProduct } from './productReducer';
import _ from "lodash";
import moment from 'moment';


export interface ISales {
    _id: string,
    discount: number,
    status: string,
    total_price: number,
    place: string,
    user: IUser,
    gained?: number ,
    createdAt?: Date,
    updatedAt?: Date,
}
export interface IDetailSales {
    _id: string,
    sale: ISales,
    product: IProduct,
    quantity: number,
    price_sale: number,
    createdAt?: Date,
    updatedAt?: Date,
}

interface ISaleState {
    sales: [],
    activePage: any,
    activeSale: any,
    detailsSales: [],
    shopCart: [],
    salesFiltered: [],
    totalGained: number,
}

const initialState: ISaleState = {
    sales: [],
    activePage: null,
    activeSale: null,
    detailsSales: [],
    shopCart: [],
    salesFiltered: [],
    totalGained: 0,
}

export const salesReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case types.salesGetAll:
            return {
                ...state,
                sales: [...action.payload]
            }

        case types.saleGetById:
            return {
                ...state,
                activeSale: action.payload
            }

        case types.saleFilterByMonthAndYear:
            const salesTemp: ISales[] = state.sales;
            const salesByYear: ISales[] =  salesTemp.filter((sale: ISales) => moment(sale.createdAt).format('YYYY') === action.payload.year )
            const salesFiltered: ISales[] = salesByYear.filter((sale) => moment(sale.createdAt).format('MM') === action.payload.month)
            return {
                ...state,
                totalGained: _.sum(salesFiltered.map((sale:ISales)=> sale.total_price)),
                salesFiltered,
            }

        case types.detailsSaleBySaleId:
            return {
                ...state,
                detailsSales: [...action.payload]
            }

        case types.salesAddItemShopCart:
            const index = state.shopCart.findIndex( (item:IProduct)=> item._id === action.payload._id );
            if(index === -1){
                return {
                    ...state,
                    shopCart: [...state.shopCart, action.payload]
                }
            } else {
                return {
                    ...state
                }
            }

        case types.salesDeleteItemShopCart:
            return {
                ...state,
                shopCart: state.shopCart.filter((product:IProduct)=> product._id !== action.payload)
            }

        case types.salesPriceSaleShopCartEdit:
            return {
                ...state,
                shopCart: state.shopCart.map( (product:  any) => 
                    product._id === action.payload.id ? 
                    (
                    {
                        ...product,
                        price_sale : action.payload.value,
                        total_price: action.payload.value * product.quantity
                    }
                    ) : product
                )
            }

        case types.salesQuantityShopCartEdit:
            return {
                ...state,
                shopCart: state.shopCart.map( (product:  any) => 
                    product._id === action.payload.id ? 
                    (
                        {
                            ...product,
                            quantity : action.payload.value,
                            total_price: action.payload.value * product.price_sale
                        }
                    ) : product
                )
            }

        case types.salesClearShopCart:
            return {
                ...state,
                shopCart: []
            }

        case types.saleDelete:
            return {
                ...state,
                sales: state.sales.filter( (sale:ISales)=> sale._id !== action.payload )
            }
    
        case types.saleAddNew:
            return {
                ...state,
                sales: [action.payload, ...state.sales]
            }

        case types.saleChangeStatus:
            return {
                ...state,
                activeSale: action.payload
            }

        default:
            return state;
    }

}


