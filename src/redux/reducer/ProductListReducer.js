const initialState = {
    productListData: [],
    productData:{},
    selectedCategories: [],
    selectedBrands: [],
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
        case "CHECKED_CATEGORY":
            return {
                ...state,
                selectedCategories: action.payload
            };
        case "CHECKED_BRAND":
            return {
                ...state,
                selectedBrands: action.payload
            };
          
        default:
            return state
    }
}
