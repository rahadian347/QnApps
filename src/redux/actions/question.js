import axios from 'axios'

import { url } from '../../config/config'

export const question = (number) => {
    return {
        type: "GET_QUESTION",

        payload: axios({
            method: 'GET',
            url: `${url.axios}/questions/${number}`
        })
    }
}
