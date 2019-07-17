
import * as types from '../types'

const initialState = {
    answers: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false
}

export default function answer(state = initialState, action) {
    switch (action.type) {
        case types.ANSWER:
            return {
                ...state,
                isLoading: true
            };
        case types.ANSWER_FULFILLED:
            return {
                ...state,
                isLoading: false, isSuccess: true,
            };
        case types.ANSWER_REJECTED:
            return {
                ...state,
                isLoading: false, isError: true
            };
        default:
            return state
    }
}