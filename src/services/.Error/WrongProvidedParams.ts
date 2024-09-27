export class CantUpdateInformedData extends Error{
    constructor(){super("cant update the informed data type. The provided data for the update function contains an invalid or unauthorized value")}
}

export class InvalidTagProvidedToTransactionType extends Error{
    constructor(){
        super("the provided Categories value is invalid to the provided trasaction type. DEP and SAL have diferent kinds os categories each")
    }
}