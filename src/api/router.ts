
import { IncomingMessage, ServerResponse } from "http";
import { HttpMethods } from "./interfaces";
import { UserController } from "./controller";
import { UserService } from "./service";
import { UserRepo } from "./repository";
import ServerError, { ErrorMsg,  } from "./errors";
import cluster from "cluster";
import {UserSharedRepo} from "./sharedRepo";



export const REGEX_UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

export const routes = (processPort:number) => {
    const userRepo = cluster.isWorker ? new UserSharedRepo() : new UserRepo([])
    const userService = new UserService(userRepo)
    const userController = new UserController(userService)
 
    return async (req: IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-type", "application/json")
    const [api, users, id] = req.url.split('/').filter(Boolean)
    try{
        console.log(`execution request: ${req.method} --- ${process.pid} on port ${processPort}`)
        if (api==="api" && users === "users"){
            switch (req.method) {
                case HttpMethods.GET: 
                    if (id && id.match(REGEX_UUID)){
                        await userController.getUser(req, res)
                    }else if(!id){
                        await userController.getUsers(req, res) 
                    }else{
                        throw ServerError.badReqErr(`${ErrorMsg.INVALID_ID} ${id}`)
                    }  
                    break;

                case HttpMethods.POST:
                    if (!id){
                        await userController.postUser(req, res)
                    }else{
                        throw ServerError.badReqErr(ErrorMsg.INVALID_REQ)
                    }                    
                    break;

                case HttpMethods.PUT:
                    if (id.match(REGEX_UUID)){
                        await userController.putUser(req, res)
                    }else{
                        throw ServerError.badReqErr(`${ErrorMsg.INVALID_ID} ${id}`)
                    }
                    break;

                case HttpMethods.DELETE:
                    if (id.match(REGEX_UUID)){
                        await userController.deleteUser(req, res) 
                    }else{
                        throw ServerError.badReqErr(`${ErrorMsg.INVALID_ID} ${id}`)
                    }
                    break;

                default:
                    throw ServerError.badReqErr(ErrorMsg.INVALID_METHOD)
            }
        }else{
            throw ServerError.badReqErr(ErrorMsg.INVALID_ENDPOINT)
        }
    }
    catch(err){
        const {msg, status} = err instanceof ServerError ? err : ServerError.internalErr()
        res.statusCode = status
        res.end(JSON.stringify({msg}))
    }
}    
}   

