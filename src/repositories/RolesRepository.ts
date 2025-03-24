import { RolesModel } from "@/modelsRolesModel";
import { Query } from "types/RepositoryTypes";
import { IRolesRepository, Roles } from "types/RolesTypes";


export class RolesRepository implements IRolesRepository{
     
    async create(data: Roles): Promise<Roles> {
        const newRoles = new RolesModel(data);
        return await newRoles.save();
    }

    async find(query:Query): Promise<Roles[]> {
        const Roless = RolesModel.find();
        return await Roless.find(query || {}).exec();
    }

    async findById(id: string): Promise<Roles | null> {
        return await RolesModel.findById(id).exec();
    }
    async update(id: string, Roles: Partial<Roles>): Promise<Roles | null> {
        return RolesModel.findByIdAndUpdate(id, Roles, {new: true}).exec();
    }
    async delete(id: string): Promise<boolean>{
        const deleted = RolesModel.findByIdAndDelete(id).exec()
        return deleted != null;
    }
}