import { app } from "./lib/app";
import { HOST, PORT } from "./lib/env";

const port = Number(PORT) 
const host = HOST || "0.0.0.0"

app.listen({
    host,
    port
},(err,path)=>{
    console.log(err ? err : path + "\nSee documentation at "+path+"/docs")
}) 