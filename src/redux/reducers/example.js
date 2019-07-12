import * as types from './../types'

const initialState = {
    data: [],
    isLoading : false,
    isError : false,
    errorMessage  : "",
    isSuccess : false
}

export default function home(state = initialState, action){
    switch (action.type){
        case  types.EXAMPLE :
        return {
            ...state,
            data: [],
            isLoading : false,
            isError : false,
            errorMessage  : "",
            isSuccess : false
        }
        
        case types.EXAMPLE_PENDING :
        return {
            ...state,
            data : action.payload
        }

        case types.EXAMPLE_REJECTED :
        return {
            ...state,
            data : action.payload
        }

        case types.EXAMPLE_FULFILLED :
        return {
            ...state,
            data : action.payload
        }

        default:
        return {
            ...state,
        }
    }
}