import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserInput, createUserSchema } from "./schema/user.schema";
import { createSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import { createPostHandler, deletePostHandler, getPostsHandler } from "./controller/post.controller"

function routes(app: Express){
    
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.status(200).send("Hi");
    });

    // create new user
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    
    //create new session
    app.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);

    // get user's sessions
    app.get('/api/sessions', requireUser, getUserSessionHandler);

    // log out
    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    // create new post
    app.post('/api/posts', requireUser, createPostHandler);

    // get posts
    app.get('/api/posts', requireUser, getPostsHandler);

    // delete post
    app.delete('/api/posts', requireUser, deletePostHandler);

}

export default routes;