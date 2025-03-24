import mongoose, {Schema} from "mongoose";
import { User } from "types/UsersTypes";
import bcrypt from "bcrypt";

const userSchema: Schema = new mongoose.Schema<User>({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, trim: true}, 
    permissions: {type:[String], default:[]},
    roles:[
        {
            ref:"Roles",
            type: Schema.Types.ObjectId
        }
    ]
},{timestamps: true, versionKey: false});

userSchema.pre<User>("save", async function(next){
    if(this.isModified("password") ||this.isNew){
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash;
    }
    next();
});

userSchema.method("comparepassword", async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password, this.password as string);
});

userSchema.methods.toJSON = function(){
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}

export const UserModel = mongoose.model<User>("UserModel",userSchema);