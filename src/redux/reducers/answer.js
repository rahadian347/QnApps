
import * as types from '../types'

const initialState = {
    answers: [],
}

export default function answer(state = initialState, action) {
    switch (action.type) {
        case types.ANSWER:
            return {
                ...state
            };
        case types.ANSWER_FULFILLED:
            return {
                ...state,
                answers: action.payload.data.data,
            };
        default:
            return state
    }
}