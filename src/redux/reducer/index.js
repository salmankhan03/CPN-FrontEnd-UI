import { combineReducers } from "redux";
import { ProductListReducer } from "./ProductListReducer";
import { CartReducer } from "./AddToCartReducer";

export const rootReducer = combineReducers({
    ProductReducer: ProductListReducer,
    CartReducer:CartReducer
})
