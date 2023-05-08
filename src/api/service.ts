// Here we declare everything required for our express server: import middlware / component routes, error handling

import { UserRepo } from "./repository";
import { UserDto, UserServiceInterface } from "./interfaces";

export class UserService implements UserServiceInterface {
    constructor (private userRepo : UserRepo){
        
    }

    async getUsers(){
        return this.userRepo.getUsers()
    }
    
    async getUser(id:string){      
        return await this.userRepo.getUser(id)
    }

    async postUser(user:UserDto){
        return await this.userRepo.postUser(user as UserDto)
    }

    async putUser(id:string, user:UserDto){
        return await this.userRepo.putUser(id, user as UserDto)
    }

    async deleteUser(id:string){
        return await this.userRepo.deleteUser(id)
    }

}