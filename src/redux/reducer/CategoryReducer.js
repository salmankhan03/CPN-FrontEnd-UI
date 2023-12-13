const initialState = {
    categoryListData: [],
}

export const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CATEGORYLIST":
            return {
                ...state,
                categoryListData:  action.payload
            }      
        default:
            return state
    }
}
