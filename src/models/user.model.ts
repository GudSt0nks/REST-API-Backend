import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// interface of user document
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

// schema of user in DB
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true },
    name:  {type: String, required: true },
    password: {type: String, required: true }
},
{
    timestamps: true,
});

// encode the password before saving
userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if(!user.isNew && user.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
})

// checking password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<Boolean> {
    const user = this as UserDocument;
    
    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;