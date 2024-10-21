import { GenRecoveryCode } from "../../../utils/GenRecoveryCode";
import {SendEmail} from "../../../lib/nodemailer/index"
import { Email } from "../../../dtos/interfaces/Email";
import { userRepositorie } from "../../../repositorie/user.repositorie";
import { UserDoesNotExists } from "../../.Error/MissedResourcesError";

interface SendCodeRequest{
    Email:string,
}

export class RecoveryCodeUseCase{
    constructor(private userRepositorie:userRepositorie){}
    async SendCode({Email}:SendCodeRequest):Promise<string>{
        //check if the user exists
        const doesTheUserExists = await this.userRepositorie.findByEmail(Email)
        if(!doesTheUserExists){
            throw new UserDoesNotExists()
        }
        const recovery = GenRecoveryCode()

        const email:Email = {
            to:Email,
            subject:`No-Reply Recuperação de Senha`,
            text:  `Assunto: Instruções para Recuperação de Senha

                    Olá ${doesTheUserExists.UsernName},

                    Recebemos uma solicitação para redefinir a sua senha. Se você não fez essa solicitação, por favor, ignore este e-mail.

                    Para criar uma nova senha, utilize o código numerico abaixo:
                                    
                                        ${recovery} 

                    Atenciosamente,
                    CibaTech
                    entre em contato conosco em: Nem fudendo que vou passar meu email`
            
        }
        //send email
        const response = await SendEmail(email)
        if(!response){
            throw new Error()
        }
        return recovery
    }
    async CompareRecoveryCode(Code:string,Provided:string):Promise<boolean>{
        return Code==Provided?true:false;
    }
}

