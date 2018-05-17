export class ContactModel {
    displayName: string;
    number: number;
    type: string;
    avatar: string;

    constructor(
        displayName?: string,
        number?: number,
        type?: string,
        avatar?: string) {
        this.displayName = displayName;
        this.number = number;
        this.type = type
        this.avatar = avatar
    }
}