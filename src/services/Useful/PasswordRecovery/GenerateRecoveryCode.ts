import { GenRecoveryCode } from "../../../utils/GenRecoveryCode";


export class RecoveryCodeUseCase{
    constructor(){}
    async genCode():Promise<string>{
        return GenRecoveryCode()
    }
    async CompareRecoveryCode(Code:string,Provided:string):Promise<boolean>{
        return Code==Provided?true:false;
    }
}