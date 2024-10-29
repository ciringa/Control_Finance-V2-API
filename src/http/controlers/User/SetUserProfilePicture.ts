import { FastifyReply, FastifyRequest } from "fastify";
import { MulterRequest } from "../../../lib/multerConfig";
import { SupabaseUseCase } from "../../../services/Useful/SupabaseUploadsUseCases";
import { supabase } from "../../../lib/supabaseClient";
<<<<<<< HEAD

export async function SetUserProfilePicture(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    const sup = new SupabaseUseCase(supabase)
    try{
        const response = sup.uploadFile(file,"User Avatar",`temp/uploads/${file.filename}`)
        res.send(response)
=======
import { randomUUID } from "crypto";
import { updateUserUseCase } from "../../../services/User/updateUseCase";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { unlink } from "fs";

export async function SetUserProfilePicture(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    const userId = req.user.sub
    const sup = new SupabaseUseCase(supabase);
    const userService = new updateUserUseCase(new PrismaUsersRepositorie())
    try{
        const response = await sup.uploadFile(file,"User Avatar",`temp/uploads/${randomUUID()}`)
        if(response){
            const tryToUpload = await userService.execute({
                userId,data:{
                    ProfileUrl:response.FileUrl
                }
            })
            const {FileUrl,fullPath,id,path} = response
            //deletes the file
            unlink(file.path, (err) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  return;
                }
              
                console.log(`File ${file.path} has been successfully removed.`);
              });
            res.status(200).send({
                id,path,fullPath,FileUrl,user:tryToUpload
            })
        }else{
            res.status(500)
        }

>>>>>>> da275fb6f11080e4c380e7fd31f1dfb06bc47f12
    }catch(err){
        console.log(err)
        res.send(err)
    }
<<<<<<< HEAD
    res.send(file)
=======
>>>>>>> da275fb6f11080e4c380e7fd31f1dfb06bc47f12
}