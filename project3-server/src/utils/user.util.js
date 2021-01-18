import jwt from 'jsonwebtoken'
import _ from 'lodash'
import {SECRET_KEY} from '../config'
export const genToken = async (payload) => {
    let token = await jwt.sign(payload, SECRET_KEY, {expiresIn: 100000})
    return token
}
export const getPayload = (user) => {
    return _.pick(user, ['id', 'email', 'name'])
}
