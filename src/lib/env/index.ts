import 'dotenv/config'
import z from 'zod'
//setup a zod schema to validate wich informations we wanna recieve from .env 
const dotEnvSchema = z.object({
    HOST:z.string(),
    PORT:z.string(),
    SALT:z.string(),
    JWT_SECRET:z.string(),
    NODE_ENV: z.enum(["DEV","DEPLOY","TESTS"])
})

//export these information if they are properly valid 
export const {HOST,PORT,SALT,JWT_SECRET,NODE_ENV} = dotEnvSchema.parse(process.env) //throw error in parse if wrong