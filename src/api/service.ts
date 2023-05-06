// Here we declare everything required for our express server: import middlware / component routes, error handling

import { validate } from "uuid";
import { UserRepo } from "./repository";
import { UserDto } from "./helpers/interfaces";

export class UserService {
    constructor (private userRepo : UserRepo){
        
    }
    async getUsers(){
        return this.userRepo.getUsers()
    }
    async getUser(id:string){      
        validate(id) ? await this.userRepo.getUser(id) : 'id is not valid'
    }
    async postUser(user:UserDto){
        if (user){// check this line, add body validator 
            return await this.userRepo.postUser(user as UserDto)
        } else{
            console.log("user's body is not valid");
        }
    }
    async putUser(id:string, user:UserDto){

        if (validate(id) && user){// check this line, add body validator 
            return await this.userRepo.putUser(id, user as UserDto)
        } else{
            console.log("user's body or id is not valid");
        }
    }
    async deleteUser(id:string){
        if (validate(id)){// check this line, add body validator 
            return await this.userRepo.deleteUser(id)
        } else{
            console.log("user's id is not valid");
        }
    }

}