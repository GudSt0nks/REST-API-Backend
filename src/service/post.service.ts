import {DocumentDefinition, FilterQuery} from 'mongoose';
import { PostDocument } from '../models/post.model';
import PostModel from '../models/post.model';

// insert new user to model
export async function createPost(input: DocumentDefinition<Omit<PostDocument, "createdAt" | "updatedAt">>) {
    try{
        const post = await PostModel.create(input);
        return post;
    }
    catch(e: any) {
        throw new Error(e);
    }
}

// find user in model
export async function findPost(query: FilterQuery<PostDocument>){
    return PostModel.find(query).lean();
}

export async function deletePost({postId}:{postId: string}, user: string) {
    return PostModel.deleteOne({_id: postId, user: user}).lean();
}