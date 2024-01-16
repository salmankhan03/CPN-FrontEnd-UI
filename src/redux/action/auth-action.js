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
export const setGuestUser = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_GUEST_USERDATA",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}