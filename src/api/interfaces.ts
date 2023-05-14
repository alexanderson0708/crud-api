import { IncomingMessage, ServerResponse } from "http";

type RouteHandler = (res: IncomingMessage, req:ServerResponse<IncomingMessage>) => Promise<void>


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


export interface UserControllerInterface {
    getUser: RouteHandler;
    getUsers: RouteHandler;
    postUser: RouteHandler;
    putUser: RouteHandler;
    deleteUser: RouteHandler;
} 

export interface UserServiceInterface { 
    getUser: (id:string) => Promise<User | void>;
    getUsers: () => Promise<User[] | void>;
    postUser: (user:User) => Promise<User| void>;
    putUser: (id:string, user:User) => Promise<User | void>;
    deleteUser: (id:string) => Promise<User[]|void>;
}

export interface UserRepositoryInterface { 
    getUser: (id:string) => Promise<User | void>;
    getUsers: () => Promise<User[]|void>;
    postUser: (user:User) => Promise<User|void>;
    putUser: (id:string, user:User) => Promise<User | void>;
    deleteUser: (id:string) => Promise<User[]|void>;
}

export const enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
} 

export const enum HttpCode {
    OK = 200,
    CREATED = 201,
    DELETED = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL = 500,
}