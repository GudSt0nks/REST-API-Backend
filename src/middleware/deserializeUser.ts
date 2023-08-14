import { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// refresh current access token
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

    const accessToken = (req.headers.authorization || req.query.access_token || req.body.access_token).replace(/^Bearer\s/, "");

    const refreshToken = req.header('x-refresh');

    if(!accessToken){
        return next();
    }

    const {decoded, expired} = verifyJwt(accessToken);

    if(decoded){
        res.locals.user = decoded;
        return next()
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if(newAccessToken){
            res.setHeader('x-access-token', newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string);
    
        res.locals.user = result.decoded;
        return next();
    }

    return next()
}

export default deserializeUser;