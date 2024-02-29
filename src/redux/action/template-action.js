export const setDefaultTemplateList = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SET_TEMPLATE_LIST",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}