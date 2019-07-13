import axios from 'axios'

import { url } from '../../config/config'

export const question = () => {
    return {
        type: "GET_QUESTION",

        payload: axios({
            method: 'GET',
            url: `${url.axios}/questions/${1}`
        })
    }
}
