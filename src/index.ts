import cluster from "cluster"
import "dotenv/config"
import os from "node:os"
import { routes } from "./api/router"
import http from "http"

const numCpus = os.cpus()


const {MODE} = process.env
const PORT:number = +process.env.PORT || 4000
const isBalancer = MODE === "cluster" && cluster.isPrimary
const processPort = Number(cluster.isPrimary ? PORT : process.env.workerPort)


const isMulti = (mode:string) => {
    if (mode === 'cluster'){
        if (cluster.isPrimary){
            return "Primary"
        }else{
            return "Worker"
        }
    }else{
        return "Server"
    }
}

    // isBalancer(processPort) 
// const server = http.createServer(
//     isBalancer ?
//     routes(PORT) :
//     isBalancer(processPort)
//     )

const server = http.createServer(
     routes(PORT)
    )

const app = () => {
    server.listen(PORT, () => {
        console.log(`${isMulti(MODE)} ${process.pid} is running at ${PORT}`);
    })
}

app();
