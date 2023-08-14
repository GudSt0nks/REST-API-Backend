import { Request, Response } from "express";
import logger from "../utils/logger";
import { createPost, findPost, deletePost } from "../service/post.service";
import { createPostInput } from "../schema/post.schema";

//create new post
export async function createPostHandler(req: Request<{}, {}, createPostInput['body']>, res: Response) {

    try {
        const post = await createPost(req.body);
        return res.status(200).send(post);
    }
    catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }

}

// get posts
export async function getPostsHandler(req: Request, res: Response){
    
    const userId = res.locals.user._id;
   
    if(req.body.target == 'any'){
        const posts = await findPost({});
        return res.send(posts);
    }

    const posts = await findPost({user: req.body.target});
    return res.send(posts);

}

// delete post by id
export async function deletePostHandler(req: Request, res: Response) {
    
    const userId = res.locals.user._id;

    try {
        const postInfo = await deletePost(req.body, userId);
        return res.send(postInfo);
    }
    catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }

}