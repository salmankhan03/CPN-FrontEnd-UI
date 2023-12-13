import { combineReducers } from "redux";
import { ProductListReducer } from "./ProductListReducer";
import { CartReducer } from "./AddToCartReducer";
import { CategoryReducer } from "./CategoryReducer";

export const rootReducer = combineReducers({
    ProductReducer: ProductListReducer,
    CartReducer:CartReducer,
    CategoryReducer:CategoryReducer

})
