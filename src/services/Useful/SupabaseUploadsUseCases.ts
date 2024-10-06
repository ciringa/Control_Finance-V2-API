import { SupabaseClient } from "@supabase/supabase-js";
import { open } from "fs";
interface SupabaseStorageReturn{
    id: string;
    path: string;
    fullPath: string;
}
interface DataReturn extends SupabaseStorageReturn{
    FileUrl:string | undefined
}
export class SupabaseUseCase{
    constructor(private supabaseClient:SupabaseClient){}
    async uploadFile(file: Express.Multer.File, bucketName: string, _path: string):Promise<DataReturn|null> {
        const fileBuffer = Buffer.isBuffer(file.buffer)? file.buffer:Buffer.from(file.buffer)
        const { data, error } = await this.supabaseClient.storage
          .from(bucketName)
          .upload(_path, file.buffer, {
            contentType: file.mimetype
          });
        if (error) {
          console.error('Erro ao fazer upload:', error.message);
          return null;
        }
        const getFileUrl = await this.supabaseClient.storage.from(bucketName).getPublicUrl(_path)
        const {fullPath,id,path} = data
        console.log(getFileUrl)
        return {
          FileUrl:getFileUrl.data.publicUrl,
          fullPath,id,path
        }; 
    }
}