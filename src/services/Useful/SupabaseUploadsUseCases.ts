import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseUseCase{
    constructor(private supabaseClient:SupabaseClient){}
    async uploadFile(file: Express.Multer.File, bucketName: string, path: string) {
        const { data, error } = await this.supabaseClient.storage
          .from(bucketName)
          .upload(path, file.buffer, {
            contentType: file.mimetype
          });
        if (error) {
          console.error('Erro ao fazer upload:', error.message);
          return null;
        }
    
        console.log('Arquivo enviado com sucesso:', data);
        return data;
    }
}