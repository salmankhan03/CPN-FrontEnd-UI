const initialState = {
    cartItems: [],
}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CARTS":
            return {
                ...state,
                cartItems:  [...state.cartItems, action.payload]
             
            }
        case "UPDATE_CARTS":
            return {
                ...state,
                cartItems:  action.payload
                }
        default:
            return state
    }
}
