import mongoose from "mongoose";
import { UserDocument } from "./user.model";

// interface of sessions
export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

// session schema in DB
const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid:  {type: Boolean, default: true },
    userAgent: {type: String},
},
{
    timestamps: true,
});

// Get session model by schema
const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;