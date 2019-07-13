import * as types from '../types'

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
}

export default function register(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: false,
                errorMessage: ''
            }
        case types.REGISTER_PENDING:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
                errorMessage: ''
            }
        case types.REGISTER_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                errorMessage: '',
                data: action.payload.data
            }
        default:
            return state

    }
}