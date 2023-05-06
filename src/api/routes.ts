// Here we define the API endpoints for the corresponding component and assign the controller methods to them. Moreover we can add more stuff like

import { IncomingMessage, ServerResponse } from "http";
import { HttpMethods } from "..";
import { UserController } from "./controller";
import { UserService } from "./service";
import { UserRepo } from "./repository";
import { error, log } from "console";
import ServerError, { ErrorMsg,  } from "./errors";

export const REGEX_UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
export const resCode:number|string = ""
export const resMsg:string = ""


export const routes = (processPort:number) => {
    const userRepo = new UserRepo([])
    const userService = new UserService(userRepo)
    const userController = new UserController(userService)

    
    return async (req: IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-type", "application/json")
    const [api, users, id] = req.url.split('/').filter(Boolean)

    try{
        if (api==="api" && users === "users"){
            switch (req.method) {
                case HttpMethods.GET: 
                    if (id && id.match(REGEX_UUID)){
                        await userController.getUser(req, res)
                    }else if(!id){
                        await userController.getUsers(req, res) 
                    }else{
                        throw ServerError.badReqErr(ErrorMsg.INVALID_ID)
                    }  
                    break;
                case HttpMethods.POST:
                    !id ? await userController.postUser(req, res) : console.log("incorrect id");
                    break;
                case HttpMethods.PUT:
                    id.match(REGEX_UUID) ? await userController.putUser(req, res) : console.log("invalid uuid")
                    break;
                case HttpMethods.DELETE:
                    id.match(REGEX_UUID) ? await userController.deleteUser(req, res) : console.log("invalid uuid")
                    break;
                default:
                    throw ServerError.badReqErr(ErrorMsg.INVALID_METHOD)
            }
        }
    }
    catch(err){
        const {msg, status} = err instanceof ServerError ? err : ServerError.internalErr()
        console.log(11111);
        
        res.statusCode = status
        res.end(JSON.stringify({msg}))
    }
}    
}   

