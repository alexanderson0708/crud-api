// The repository class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
import { UUID, randomUUID } from "node:crypto";
import { User, UserDto, UserRepository } from "./helpers/interfaces";
import ServerError, { ErrorMsg} from "./errors";

export class UserRepo implements UserRepository{
    constructor(private users: User[]){

    }

    async getUsers (): Promise<User[]> {
        console.log(this.users);
        return this.users
    }

    async getUser (id:string): Promise<User>{    
        const user = this.users.find((user) => user.id === id)
        if (user) {
            return user
        }
        throw ServerError.notFoundErr(`User with id: "${id}" does not exist`)
    }

    async postUser (user:UserDto): Promise<User>{
        const newUser = {...user, id:randomUUID()}
        this.users.push(newUser)
        this.getUsers()
        
        return newUser
    }
    
    async putUser (id:string, user:UserDto): Promise<User | void> {
        const findUser = this.users.find((user) => user.id === id) 
        findUser ? 
        this.users[this.users.indexOf(findUser)] = {...user, id:findUser.id}
        : console.log('this user not found');
    }

    async deleteUser (id:string): Promise<User[] | void> {
        const findUser = this.users.find((user) => user.id === id) 
        findUser ? 
        this.users.splice(this.users.indexOf(findUser), 1) : 
        console.log('this user not found');
    }

}

