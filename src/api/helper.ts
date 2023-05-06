// The helper class contains helper methods for hashing, UUIDs and so on.

import { IncomingMessage } from "node:http"
import { UserDto } from "./helpers/interfaces"


export const getBody = async(req:IncomingMessage): Promise<UserDto> => {
    
    return new Promise((resolve, reject) => {
        const buff:Uint8Array[] = []
        req.on("data", (chunk:Uint8Array)=>{
            buff.push(chunk)
        })
        .on("end", ()=>{
            const body = Buffer.concat(buff).toString().trim()
            try{
                resolve(JSON.parse(body))
            }catch (err){
                reject(err)
            }
        })
        .on("error", ()=>{
            reject()
        })
    })
}

export const isValidUser = (user: UserDto) => {
    if (typeof user.username === 'string' 
    && typeof user.age === 'number'
    && Array.isArray(user.hobbies)
    && user.hobbies.every((hobbie)=>typeof hobbie === "string")){
        return true
    }else{
        return false
    }
}