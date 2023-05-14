import os from "node:os"
import cluster from "cluster"
import { UserRepo } from "./repository"
import { EventEmitter } from "node:stream"
import { UserRepositoryInterface } from "./interfaces"
import {Message} from "./sharedRepo";
import {IncomingMessage, request, ServerResponse} from "http";


export const balancer = (port:number) => {
    const cores = os.cpus()
    const repository = new UserRepo([]) as any

    const workerPorts = cores.map((core, index)=>{
        const workerPort = port + index + 1
        const worker = cluster.fork({workerPort})
        cluster.on('exit', (worker)=>{
            console.log(`worker ${worker} died!`);
        })

        worker.on('message', async(message:Message)=>{
            const args = "data" in message ? message.data : []

            const res  = async () => {
                try {
                    const resultData:UserRepo = await repository[message.action](...args)
                    worker.send(resultData)
                }
                catch (e) {
                    worker.send({status:e.status, message:e.message})
                }
            }
            await res()
        })
        return workerPort
    })
    let newPortIndex = 0

    return (req:IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
        const port = workerPorts[newPortIndex++ % cores.length]
        const connector = request(
            {
                host: "localhost",
                path: req.url,
                method: req.method,
                headers: req.headers,
                port
            },
            (resWorker)=>{
                res.statusCode = resWorker.statusCode
                res.setHeader("content-type", resWorker.headers["content-type"])
                resWorker.pipe(res)
            }
        )
        req.pipe(connector)
    }
    
}


