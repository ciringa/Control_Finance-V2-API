import { faker } from "@faker-js/faker"
import {prisma} from "../src/lib/prisma"
import { Account, User } from "@prisma/client"
import { getRandomItem, getRandomItemByInteger } from "../src/utils/choose"
import { CreateTransactionUseCase } from "../src/services/Transactions/CreateTransaction"
import { PrismaTransactionsRepositorie } from "../src/repositorie/PrismaRepositories/PrismaTransactions"
import { PrismaAccountRepositorie } from "../src/repositorie/PrismaRepositories/PrismaAccountRepositorie"

async function seed() {
    var user:User
    const admin = await prisma.user.findUnique({
        where:{
            Email:"dev@gmail.com"
        }
    })
    if(admin){
        user = admin
    }else{
        user = await prisma.user.create({
            data:{
                Email:faker.internet.email(),
                Senha:faker.internet.password(),
                UsernName:faker.internet.userName(),            
            }
    })

    }
    var aList:Account[] = []
    for(let i=0;i<5;i++){
        aList.push(await prisma.account.create({
            data:{
                Name:faker.lorem.word(),
                Description:faker.lorem.text(),
                userId:user.Id,
                Value:faker.number.int({min:100,max:200}),
                Type:getRandomItem(["Carteira","ContaBancaria","Poupanca","CorretoraDeInvestimentos"])
            }
        }))
    }

    for(let i=0;i<30;i++){
        await new CreateTransactionUseCase(new PrismaTransactionsRepositorie(),new PrismaAccountRepositorie()).execute({
            data:{
                Title:faker.lorem.word(),
                Type:i%2==0?"DEP":"SAL",
                Value:faker.number.int({
                    min:100,max:2000,
                }),
                CreatedAt:faker.date.between({
                    from:new Date().setFullYear(2001,9,11),
                    to:new Date()
                }),
                accountId:aList[await getRandomItemByInteger(aList.length)].Id,
                Categories:i%2==0?getRandomItem(["Investimento","Salario","Comissao","Outro",]):getRandomItem(["Alimentacao","Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas"])
            }
        })
    }

    //generate metas
    for(let i=0;i<5;i++){
        await prisma.goals.create({
            data:{
                EndTime:faker.date.future({
                    refDate:new Date(),
                }),
                Title:faker.lorem.word(),
                CreatedAt:i%2==0?new Date():faker.date.past(),
                userId:user.Id,
                TargetedValue:faker.number.int({
                    min:500,max:1000
                }),
                Value:faker.number.int({
                    min:200,max:400
                }),
                CompletedAt:i%2==0?new Date():undefined,
            }
        })
    }
}

seed().then(()=>{
    console.log("prisma DB seeded")
})