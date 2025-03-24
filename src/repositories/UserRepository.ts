import { UserModel } from "@/modelsUserModel";
import { Query } from "types/RepositoryTypes";
import { IUserRepository, User } from "types/UsersTypes";

export class UserRepository implements IUserRepository{
     
    async create(data: User): Promise<User> {
        const newUser = new UserModel(data);
        return await newUser.save();
    }

    async find(query:Query): Promise<User[]> {
        const users = UserModel.find();
        return await users.find(query || {}).populate("Roles").exec();
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).populate("Roles").exec();
    }

    async findOne(query: Query): Promise<User | null> {
        return await UserModel.findOne(query).populate("Roles");
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        return UserModel.findByIdAndUpdate(id, user, {new: true}).populate("Roles").exec();
    }
    async delete(id: string): Promise<boolean>{
        const deleted = UserModel.findByIdAndDelete(id).exec()
        return deleted != null;
    }
}