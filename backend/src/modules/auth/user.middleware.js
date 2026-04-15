import ApiError from "../../common/utils/api-error.js";
import * as utils from '../../common/utils/jwt.utils.js'
import * as models from './user.model.js'
import pool from '../../common/config/db.js'

const authenticate = async (req, res, next) => {
    let token;
    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token) throw ApiError.forbidden('No AccessToken');

    const decodedToken = await utils.verifyAccessToken(token)
    if(!decodedToken) throw ApiError.forbidden('Not authenticated')

    const decoded = await models.getUserByEmail(pool, decodedToken)
    if(!decoded) throw ApiError.notfound();

    req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
    }
    next();
}

export {authenticate}