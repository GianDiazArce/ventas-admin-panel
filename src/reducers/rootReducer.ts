import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import { categorieReducer } from './categoriesReducer';
import { authReducer } from "./authReducer";
import { suppliersReducer } from './suppliersReducer';
import { productReducer } from './productReducer';
import { salesReducer } from './salesReducer';


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    cat: categorieReducer,
    sup: suppliersReducer,
    prod: productReducer,
    sal: salesReducer,
    // TODO:  AuthReducer
})