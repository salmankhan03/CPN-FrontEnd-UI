const initialState = {
    userData: {},
    guestUserData: {},
    userToken:{}
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return {
                ...state,
                userData: action.payload
            }
        case "SET_USERTOKEN":
            return {
                ...state,
                userToken: action.payload
            }
        case "SET_GUEST_USERDATA":
            return {
                ...state,
                guestUserData: action.payload
            }
        default:
            return state
    }
}
