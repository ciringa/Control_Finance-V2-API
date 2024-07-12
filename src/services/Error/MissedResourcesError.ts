

export class UserDoesNotExists extends Error{
    constructor(){super("the specified user does not exists")}
}


export class AccountDoesNotExists extends Error{
    constructor(){super("the specified Account does not exists")}
}

export class TransactionDoesNotExists extends Error{
    constructor(){super("the specified Transaction does not exists")}
}

