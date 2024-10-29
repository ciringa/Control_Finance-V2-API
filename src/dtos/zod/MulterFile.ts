import { size } from "lodash";
import z from "zod";

export const MulterFile = z.object({
    fieldname:z.string(),
    originalname:z.string(),
    encoding:z.string(),
    mimetype:z.string(),
    destination:z.string(),
    filename:z.string(),
    path:z.string(),
    size:z.number()
})