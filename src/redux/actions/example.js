import axios from 'axios'

import * as types from './../types'
import { url } from './../../config/config'

export const EXAMPLE = () => {
    return {
        type : types.EXAMPLE,
        payload : axios({
            method : "GET",
            url : `${url.server}api/v1/EXAMPLE`
        })
    }
}