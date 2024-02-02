export const addtoCartItems = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "ADD_TO_CARTS",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCartItems = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "UPDATE_CARTS",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCartSubTotal = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "UPDATE_CART_SUBTOTAL",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const addCoupon = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "ADD_COUPON",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
