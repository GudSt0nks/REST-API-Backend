import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSession, updateSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { access } from "fs";

//create new session
export async function createSessionHandler(req: Request, res: Response) {
    
    //validate password
    const user = await validatePassword(req.body);

    if(!user){
        return res.status(401).send('Invalid email or password');
    }

    //create session
    const session = await createSession(user._id, req.get("user-agent") || "");

    //create an access token

    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
    );

    //create refresh token

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('refreshTokenTtl')}
    );

    //return access and refresh tokens
    
    return res.send({accessToken, refreshToken});

}

//get session by user id
export async function getUserSessionHandler(req: Request, res: Response){
    const userId = res.locals.user._id;

    const sessions = await findSession({user: userId, valid: true});

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId}, {valid: false});

    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}