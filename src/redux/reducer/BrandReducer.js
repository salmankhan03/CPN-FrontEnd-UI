const initialState = {
    brandsListData: [],
}

export const BrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BRANDLIST":
            return {
                ...state,
                brandsListData:  action.payload
            }      
        default:
            return state
    }
}
