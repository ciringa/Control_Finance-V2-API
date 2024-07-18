export class UserIsNotOwnerOfTHeAccount extends Error{
    constructor(){
        super("user does not owns the account that wanna modify, view or delete")
    }
}