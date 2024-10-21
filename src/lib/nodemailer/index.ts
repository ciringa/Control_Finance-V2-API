import nodemailer from "nodemailer"
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../env";
import { string } from "zod";

console.log(ADMIN_EMAIL,ADMIN_PASSWORD)
//configuração de conexao com o nodemailer
export const config = {
    host:"smtp.gmail.com",
    port:587, // nescessario utilizar portas especificas para o google
    user:ADMIN_EMAIL, //Gmail needs to accept conections of low secutiry
    pass:ADMIN_PASSWORD
}

export interface Email{
    text: string
    to: string 
    subject:string
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


async function run() {
    const emailSent = await transport.sendMail({
        text:"Ola mundo",
        subject:"Assunto do email",//assunto do email a ser enviado
        from:config.user,// - responsavel pelo envio(por padão será o email cadastrado)
        to:["nasam73749@chysir.com"]//emails que a mensagem será enviada
    })//envia um email
    return emailSent
}

async function SendEmail(eamil:Email) {
    const {subject,text,to} = eamil
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