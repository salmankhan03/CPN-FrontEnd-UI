const initialState = {
    cartItems: [],
    cartSubTotal: null,
    orderTotal:null,
    coupon: {},
    province: null,
    cartTotalTax: {
        "gst": 0,
        "hst": 0,
        "pst": 0
    },
}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CARTS":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]

            }
        case "UPDATE_CARTS":
            return {
                ...state,
                cartItems: action.payload
            }
        case "REMOVE_ALL_CARTS_ITEMS":
            return {
                ...state,
                cartItems: action.payload
            }
        case "UPDATE_CART_SUBTOTAL":
            return {
                ...state,
                cartSubTotal: action.payload
            }
        case "ADD_COUPON":
            return {
                ...state,
                coupon: action.payload
            }
        case "UPDATE_CART_TOTAL_TAX":
            return {
                ...state,
                cartTotalTax: action.payload
            }
        case "SET_PROVINCE":
            return {
                ...state,
                province: action.payload
            }
        case "SET_ORDER_TOTAL":
            return {
                ...state,
                orderTotal: action.payload
            }

        default:
            return state
    }
}
