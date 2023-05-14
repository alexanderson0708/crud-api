import cluster from "cluster"
import "dotenv/config"
import { routes } from "./api/router"
import {createServer} from "http"
import {balancer} from "./api/balancer";
import {instanceType} from "./api/helper";

export const {MODE} = process.env
const PORT:number = +process.env.PORT || 4000
const isBalancer = MODE === "cluster" && cluster.isPrimary
const processPort = Number(cluster.isPrimary ? PORT : process.env.workerPort)

export const server = createServer(
    isBalancer ? balancer(processPort) : routes(processPort)
    )

server.listen(processPort, () => {
    console.log(`${instanceType(MODE)} ${process.pid} is running at ${processPort}`);
})
