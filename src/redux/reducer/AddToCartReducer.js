const initialState = {
    cartItems: [],
    cartSubTotal: null,
    coupon: {},
    cartTotalTax: {
        "gst": 0,
        "hst": 0,
        "pst": 0
    }
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
        default:
            return state
    }
}
