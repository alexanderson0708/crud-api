import {User, UserDto, UserRepositoryInterface} from "./interfaces"
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

export type Message = getUserMsg | getUsersMsg | postUserMsg | putUserMsg | deleteUserMsg

export type dataRes<T> = T
export type errRes = {
    status:number;
    message:string;
}
export type msgRes<T> = dataRes<T> & errRes

export class UserSharedRepo implements UserRepositoryInterface{
    constructor(){

    }

    async getUsers():Promise<User[]|void>{
       return new Promise((resolve, reject)=>{
           process.send(getUsersMsg())
           process.once('message', async (res:msgRes<User[]>)=>{
               res? resolve(res) : reject(ServerError.notFoundErr(res.message))
           })
       })
    }

    async getUser (id:string):Promise<User|void>{
        return new Promise((resolve, reject)=>{
            process.send(getUserMsg(id))
            process.once('message', (res:msgRes<User>)=>{
                res ? resolve(res) : reject(ServerError.notFoundErr(res.message))
            })
        })
    }

    async postUser (user:UserDto):Promise<User|void>{
        return new Promise((resolve, reject)=>{
            process.send(postUserMsg(user))
            process.once('message', (res:msgRes<User>)=>{
                res ? resolve(res) : reject(ServerError.notFoundErr(res.message))
            })
        })
    }

    
    async putUser (id:string, user:UserDto):Promise<User|void>{
        return new Promise((resolve, reject)=>{
            process.send(putUserMsg(id, user))
            process.once('message', (res:msgRes<User>)=>{
                res ? resolve(res) : reject(ServerError.notFoundErr(res.message))
            })
        })
    }


    async deleteUser (id:string):Promise<User[]|void> {
        return new Promise((resolve, reject)=>{
            process.send(deleteUserMsg(id))
            process.once('message', (res:msgRes<User[]>)=>{
                res ? resolve(res) : reject(ServerError.notFoundErr(res.message))
            })
        })
    }


}