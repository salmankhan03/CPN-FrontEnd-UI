const initialState = {
    userData: {},
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return {
                ...state,
                userData:  action.payload
            }      
        default:
            return state
    }
}
