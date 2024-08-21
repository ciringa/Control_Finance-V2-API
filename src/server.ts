import { app } from "./lib/app";
import { HOST, PORT } from "./lib/env";

const port = Number(PORT) 
const host = HOST || "0.0.0.0"

app.listen({
    host,
    port
},(err,path)=>{
    console.log(err ? err : `\t\x1b[44m\x1b[30m\x1b[4mControl Finance V2\x1b[0m\n\tAplication V 1.0.6 \n\nAplication Running at \x1b[34m ${path}\x1b[0m \nSee documentation at \x1b[34m ${path}/docs\x1b[0m`)
})