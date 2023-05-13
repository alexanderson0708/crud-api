import { UserDto } from "./interfaces"
import ServerError from "./errors";

export const getUserMsg = (id:string) => ({action:"getUser", data:[id]})
export const getUsersMsg = () => ({action:"getUsers"})
export const postUserMsg = (user:UserDto) => ({action:"postUser", data:[user]})
export const putUserMsg = (id:string, user:UserDto) => ({action:"putUser", data:[id, user]})
export const deleteUserMsg = (id:string) => ({action:"deleteUser", data:[id]})

export type getUserMsg = ReturnType<typeof getUserMsg>
export type getUsersMsg = ReturnType<typeof getUsersMsg>
export type postUserMsg = ReturnType<typeof postUserMsg>
export type putUserMsg = ReturnType<typeof putUserMsg>
export type deleteUserMsg = ReturnType<typeof deleteUserMsg>

type Message = getUserMsg | getUsersMsg | postUserMsg | putUserMsg | deleteUserMsg

export type dataRes<T> = {
    data:T;
}
export type errRes = {
    status:number;
    message:string;
}
export type msgRes<T> = dataRes<T> & errRes

export class UserSharedRepo { 
    constructor(){

    }

    async getUsers(){
        process.send(getUsersMsg())
        process.once("message", (msg)=>msg['data'])
    }

    async getUser (id:string){    
        // process.send(getUserMsg(id))
        this.getRes(getUserMsg(id))
    }

    async postUser (user:UserDto){
        process.send(postUserMsg(user))
    }
    
    async putUser (id:string, user:UserDto){
        process.send(putUserMsg(id, user))
    }

    async deleteUser (id:string) {
        process.send(deleteUserMsg(id))
    }

    private getRes<T>(func:Message){
        return new  Promise ((resolve, reject)=>{
            const result = process.send(func, ()=>{
                process.once(func.action, (msg)=>{
                    resolve(msg['data'])
                })
            })
        })
    } 
}