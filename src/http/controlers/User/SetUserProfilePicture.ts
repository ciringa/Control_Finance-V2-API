import { FastifyReply, FastifyRequest } from "fastify";
import { MulterRequest } from "../../../lib/multerConfig";
import { SupabaseUseCase } from "../../../services/Useful/SupabaseUploadsUseCases";
import { supabase } from "../../../lib/supabaseClient";

export async function SetUserProfilePicture(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    const sup = new SupabaseUseCase(supabase)
    try{
        const response = sup.uploadFile(file,"User Avatar",`temp/uploads/${file.filename}`)
        res.send(response)
    }catch(err){
        console.log(err)
        res.send(err)
    }
    res.send(file)
}