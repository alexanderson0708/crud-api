// The controller class handles incoming requests and sends the response data back to the client. It uses the repository class to interact with the database. Request validation happens via middleware few steps before

import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "./service";
import { UserDto } from "./helpers/interfaces";
import { HttpCode } from "./errors";
import { getBody, isValidUser } from "./helper";

export class UserController {
    constructor (private userService: UserService) {

    }
    
    async getUser(req:IncomingMessage, res:ServerResponse<IncomingMessage>) {
        const[api, users, id] = req.url.split('/').slice(1)
        const user = await this.userService.getUser(id) 
        res.statusCode = HttpCode.OK
        res.end(JSON.stringify(user))
    }
    
    async getUsers(req:IncomingMessage, res:ServerResponse<IncomingMessage>) {
        const users = await this.userService.getUsers() 
        res.statusCode = HttpCode.OK       
        res.end(JSON.stringify(users))
    }

    async postUser(req:IncomingMessage, res:ServerResponse<IncomingMessage>) {
        const body = await getBody(req)
        if (isValidUser(body)){          
            const user = await this.userService.postUser(body) 
            res.statusCode = HttpCode.CREATED
            res.end(JSON.stringify(user))
        }else{
            console.log('body is not valid');     
        }
    }

    async putUser(req:IncomingMessage, res:ServerResponse<IncomingMessage>) {
        const body = await getBody(req)
        const[api, users, id] = req.url.split('/').slice(1)
        if (isValidUser(body)){
            const user = await this.userService.putUser(id, body) 
            res.statusCode = HttpCode.OK
            res.end(JSON.stringify(user))
        }else{
            console.log('body is not valid');     
        }
    }

    async deleteUser(req:IncomingMessage, res:ServerResponse<IncomingMessage>) {
        const[api, users, id] = req.url.split('/').slice(1)
        const user = await this.userService.deleteUser(id) 
        res.statusCode = HttpCode.DELETED
        res.end(JSON.stringify(user))
    }
}

