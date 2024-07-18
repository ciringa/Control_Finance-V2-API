export class CantUpdateInformedData extends Error{
    constructor(){super("cant update the informed data type. The provided data for the update function contains an invalid or unauthorized value")}
}