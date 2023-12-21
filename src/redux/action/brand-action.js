export const setBrandList = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_BRANDLIST",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}