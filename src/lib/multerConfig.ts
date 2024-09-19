import { FastifyInstance } from "fastify";
import multer from "fastify-multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // pasta de destino
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // nome do arquivo
      }
})
//setup a multer upload instance 
export const upload = multer({ storage: storage })//dest shows where the files will be stored, change it later to use supabase buckets

export async function multerConfig(app:FastifyInstance) {
    //register fastify multer for user profile upload
    app.register(multer.contentParser)
}