import { FastifyReply, FastifyRequest } from "fastify";
import { MulterRequest } from "../../../lib/multerConfig";
import { SupabaseUseCase } from "../../../services/Useful/SupabaseUploadsUseCases";
import { supabase } from "../../../lib/supabaseClient";
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

    }catch(err){
        console.log(err)
        res.send(err)
    }
}