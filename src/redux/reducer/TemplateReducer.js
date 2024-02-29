const initialState = {
    templateList: [],
}

export const TemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TEMPLATE_LIST":
            return {
                ...state,
                templateList: action.payload
            }
        default:
            return state
    }
}
