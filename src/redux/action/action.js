export const setProductList = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_PRODUCTLIST",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const setProductDetails = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "PRODUCT_DETAILS",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const setSelectedCategorie = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "CHECKED_CATEGORY",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const setSelectedBrand = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "CHECKED_BRAND",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
