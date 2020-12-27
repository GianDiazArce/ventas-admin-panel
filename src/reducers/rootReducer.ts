import { combineReducers } from "redux";
// import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { categorieReducer } from './categoriesReducer';


export const rootReducer = combineReducers({
    ui: uiReducer,
    cat: categorieReducer,
    // TODO:  AuthReducer
})