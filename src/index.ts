import cluster from "cluster"
import "dotenv/config"
import os from "node:os"
import { routes } from "./api/routes"
import http, { IncomingMessage } from "http"



export const enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
} 


const {MODE} = process.env
const PORT:number = +process.env.PORT || 4000
const server = http.createServer(routes(PORT))

const app = () => {
    server.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    })
}

app();
