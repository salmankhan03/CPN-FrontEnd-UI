const initialState = {
    productListData: [],
    productData:{}
}

export const ProductListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PRODUCTLIST":
            return {
                ...state,
                productListData:  action.payload
            }
        case "PRODUCT_DETAILS":
            return {
                ...state,
                productData: action.payload
            };
          
        default:
            return state
    }
}
