import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { createUserInput } from "../schema/user.schema";
import { omit } from "lodash";

//create new user
export async function createUserHandler(req: Request<{}, {}, createUserInput['body']>, res: Response) {

    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON, "password"));
    }
    catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}