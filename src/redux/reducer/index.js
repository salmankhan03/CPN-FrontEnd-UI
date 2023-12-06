import { combineReducers } from "redux";
import { ProductListReducer } from "./ProductListReducer";

export const rootReducer = combineReducers({
    ProductReducer: ProductListReducer,
})
