

const initialState = {
    questions: []
}

export default function question(state = initialState, action) {
    switch (action.type) {
        case "GET_QUESTION":
            return {
                ...state
            };
        case "GET_QUESTION_FULFILLED":
            return {
                ...state,
                questions: action.payload.data.data
            };
        default:
            return state
    }
}