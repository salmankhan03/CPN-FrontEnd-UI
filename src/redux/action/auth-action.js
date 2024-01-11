export const setUserData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_USERDATA",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}