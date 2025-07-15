import { log } from "console"
import http from "http"
import { text } from "stream/consumers"

const server=http.createServer((req,res)=>{
    res.setHeader(200,{"Content-type":"text/plain"})
    res.end("Hello World")
})

server.listen(4000,()=>{
    console.log(wserver running);
    
})