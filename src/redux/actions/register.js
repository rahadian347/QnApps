import * as types from '../types'
import axios from 'axios'
import { url } from '../../config/config'

export const register = ({name, email, phone_number}) => {
    return {
        type: types.REGISTER,
        payload: axios({
            method: 'POST',
            url: `${url.axios}/user`,
            data: {
                name,
                email,
                phone_number
            }
        })
    }
}

export const registerSuccess = () => {
    return {
        type: types.REGISTER,
        payload: {}
    }
}