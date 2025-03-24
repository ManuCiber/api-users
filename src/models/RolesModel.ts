import mongoose, {Schema} from "mongoose";
import { Roles } from "types/RolesTypes";

const RolesSchema: Schema = new mongoose.Schema<Roles>({
    name: {type: String, required: true, unique: true}, 
    permissions:{type:[String], default:[]},
},{timestamps: true, versionKey: false});


export const RolesModel = mongoose.model<Roles>("RolesModel",RolesSchema);