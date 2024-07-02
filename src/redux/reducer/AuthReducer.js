const initialState = {
    userData: {},
    guestUserData: {},
    userToken:{},
    userLogInOrNot: false,
    userGuestOrNot: false,
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
        case "SET_USER_LOGIN_OR_NOT":
            return {
                ...state,
                userLogInOrNot: action.payload
            }
        case "SET_USER_GUEST_OR_NOT":
            return {
                ...state,
                userGuestOrNot: action.payload
            }
        default:
            return state
    }
}
