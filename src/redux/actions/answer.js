import axios from 'axios'
import * as types from '../types'
import { url } from '../../config/config'

export const answer = ({question_id, user_id, answer, attachment}) => {
    return {
        type: types.ANSWER,
        payload: axios({
            method: 'POST',
            url: `${url.axios}/answer/`,
            data: {
                question_id,
                user_id,
                answer,
                attachment
            }
        })
       
    }
}

// return {
//     type: types.REGISTER,
//     payload: axios({
//         method: 'POST',
//         url: `${url.axios}/auth/register`,
//         data: {
//             username,
//             email,
//             password,
//             confirm_password
//         }
//     })
// }