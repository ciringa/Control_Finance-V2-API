import { FastifyRequest } from "fastify";
import multer from "fastify-multer";

<<<<<<< HEAD

export const upload = multer({
  dest:".temp/uploads/"
=======
const storage = multer.memoryStorage()
export const upload = multer({
  dest:".temp/uploads/",
  storage
>>>>>>> da275fb6f11080e4c380e7fd31f1dfb06bc47f12
})

export interface MulterRequest extends FastifyRequest{
  file:Express.Multer.File
}