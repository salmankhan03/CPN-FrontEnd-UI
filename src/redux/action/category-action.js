export const setCategoryList = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_CATEGORYLIST",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}