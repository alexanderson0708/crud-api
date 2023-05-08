import os from "node:os"
import cluster from "cluster"
import { UserRepo } from "./repository"


export const balancer = (port:number) => {
    const cores = os.cpus()
    const repository = new UserRepo([])

    for (let i=0; i < os.cpus.length; i++){
        const workerPort = i + 1
        const worker = cluster.fork({workerPort}) 
        worker.on('message', async (msg)=>{

        })
    }

    
}