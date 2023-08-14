import mongoose from "mongoose";

// interface of post document
export interface PostDocument extends mongoose.Document {
    title: string;
    text: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}

// schema of post in DB
const postSchema = new mongoose.Schema({
    title: {type: String, required: true },
    text:  {type: String, required: true },
    user:  {type: String, required: true }
},
{
    timestamps: true,
});

const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;