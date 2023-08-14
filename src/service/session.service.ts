import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { get } from "lodash";
import { findUser } from "./user.service";
import config from 'config';

// create new session
export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent});

    return session.toJSON();
}

// find session by query
export async function findSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

// update session by query and update
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

// make new accessToken by refreshToken
export async function reIssueAccessToken({refreshToken,}:{
    refreshToken: string;
}) {

    const {decoded} = verifyJwt(refreshToken);

    if(!decoded || !get(decoded, 'session')) return false;

    const session = await SessionModel.findById(get(decoded, 'session'));

    if(!session || !session.valid) return false;

    const user = await findUser({_id: session.user});
    
    if(!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") }
    )

    console.log("new Token!");

    return accessToken;
}