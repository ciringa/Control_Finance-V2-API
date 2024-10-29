import { FastifyRequest } from "fastify";
import multer from "fastify-multer";


export const upload = multer({
  dest:".temp/uploads/"
})

export interface MulterRequest extends FastifyRequest{
  file:Express.Multer.File
}