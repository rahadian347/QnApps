import * as types from './../types'

const initialState = {
    questions: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
    page: 1
}

export default function question(state = initialState, action) {
    switch (action.type) {
        case types.GET_QUESTION:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
                errorMessage: ''
            };
        case types.GET_QUESTION_PENDING:

            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
                errorMessage: "Pending"
            }
        case types.GET_QUESTION_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: 'Error get question'
            };
        case types.GET_QUESTION_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                errorMessage: '',
                page: state.page + 1,
                questions: action.payload.data.data,
            };
        default:
            return state
    }
}