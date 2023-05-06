import { IncomingMessage, ServerResponse } from "http";



export interface User {
    id:string;
    username: string;
    age:number;
    hobbies:string[];
}

export interface UserDto {
    username: string;
    age:number;
    hobbies:string[];
} 

export interface RouteHandler {
    req: IncomingMessage;
    res: ServerResponse<IncomingMessage>;
}

export interface UserController {
    getUser: RouteHandler;
    getUsers: RouteHandler;
    createUser: RouteHandler;
    deleteUser: RouteHandler;
    updateUser: RouteHandler;
}

// export interface IUserService { 
//     getUser: (id:string) => Promise<User>;
//     getUsers: () => Promise<User[]>;
//     createUser: (user:unknown) => Promise<User>;
//     deleteUser: (id:string) => Promise<Deleted>;
//     updateUser: (id:string, user:unknown) => Promise<User>;
// }

export interface UserRepository { 
    getUser: (id:string) => Promise<User | void>;
    getUsers: () => Promise<User[]>;
    postUser: (user:User) => Promise<User>;
    putUser: (id:string, user:User) => Promise<User | void>;
    deleteUser: (id:string) => Promise<User[]|void>;
}