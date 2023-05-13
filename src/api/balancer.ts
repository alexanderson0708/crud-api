import os from "node:os"
import cluster from "cluster"
import { UserRepo } from "./repository"
import { EventEmitter } from "node:stream"
import { UserRepositoryInterface } from "./interfaces"


enum commandMsg {
    "getUser",
    "getUSer",
    "postUser",
    "putUser",
}

export const balancer = (port:number) => {
    const cores = os.cpus()
    const repository = new UserRepo([])
   
    const workerPorts = cores.map((core, index)=>{
        const workerPort = index + 1
        cluster.fork({workerPort}) 
    })

    cluster.on('exit', (worker)=>{
        console.log(`worker ${worker.process.pid} died!`);
    })
    
    cluster.on('message', async(message)=>{
        const method = UserRepo[message.action]
        
    })
    

    
}