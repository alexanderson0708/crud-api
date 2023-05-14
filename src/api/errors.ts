import { HttpCode } from "./interfaces"


export const enum ErrorMsg {
    INVALID_ID = "Invalid user id",
    NOT_FOUND_ID = "Id does not exist",
    INVALID_BODY = "Request body does not contain required fields",
    INTERNAL_ERR = "Server error",
    INVALID_ENDPOINT = "Endpoint is not available",
    INVALID_METHOD = "Method is not supported",
    INVALID_REQ = "This method does not requered uuid!",
}

class ServerError extends Error{
    constructor(public msg:string, public status:number){
        super()
    }
    static badReqErr(msg:string){ 
        return new ServerError(msg, HttpCode.BAD_REQUEST)
    }
    
    static notFoundErr(msg:string){ 
        return new ServerError(msg, HttpCode.NOT_FOUND)
    }
    
    static internalErr(){ 
        return new ServerError(ErrorMsg.INTERNAL_ERR, HttpCode.INTERNAL)
    }
}

export default ServerError