import {SECRET_KEY} from '../config'
import jwt from 'jsonwebtoken'
import {User} from '../models'
const Auth = async (req, res, next) => {
    
    const header = req.get("Authorization")
    if (!header){
        req.isAuth = false
        return next()
    }

    const token = header.split(' ')[1]
    if (!token || token===''){
        req.isAuth = false
        return next()
    }

    let decodeToken
    try{
        decodeToken = jwt.verify(token, SECRET_KEY)
    }catch(err){
        req.isAuth = false
        return next()
    }

    if (!decodeToken) {
        req.isAuth = false
        return next()
    }

    let user = await User.findById(decodeToken.id)
    if (!user){
        req.isAuth = false
        return next()
    }
    req.isAuth = true
    req.user = user
    return next()
} 

export default Auth