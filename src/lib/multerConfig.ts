import { FastifyRequest } from "fastify";
import multer from "fastify-multer";

const storage = multer.memoryStorage()
export const upload = multer({
  dest:".temp/uploads/",
  storage
})

export interface MulterRequest extends FastifyRequest{
  file:Express.Multer.File
}