import nodemailer from "nodemailer"
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../env";
import { Email } from "../../dtos/interfaces/Email";


//configuração de conexao com o nodemailer
export const config = {
    host:"smtp.gmail.com",
    port:587, // nescessario utilizar portas especificas para o google
    user:ADMIN_EMAIL, //Gmail needs to accept conections of low secutiry
    pass:ADMIN_PASSWORD
}

// setup nodemailer instance
const transport = nodemailer.createTransport({
    host:config.host,
    port:config.port,
    secure:false, //define que nao havera segurança
    auth:{ //usuário que enviará os emails
        user:config.user,
        pass:config.pass
    },
    tls:{
        rejectUnauthorized:false //define que nao será recusado em redes nao autorizadas
    }
});

export async function SendEmail(email:Email) {
    const {subject,text,to} = email
    const emailSent = await transport.sendMail({
        text,
        subject,
        to,
        from:config.user
    })
    return emailSent
}
// run().then((res)=>{
//     console.log(res)
// })