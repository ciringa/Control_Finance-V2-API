
//Error if the Email is Already in Use
export class EmailAlreadyExists extends Error {
    constructor(){
        super("The Email Adress is already in use")
    }
}
//Error if the password is invalid
export class InvalidPassword extends Error{
    constructor(){
        super("Invalid Password, try to use ")
    }
}

export class GoalCantBeValidated extends Error{
    constructor(){
        super("the specified goal can't be validated")
    }
}