export class QuickbooksException extends Error {
    constructor(public readonly payload: any) {
        super();
    }

    public get message(): string {
        return JSON.stringify(this.payload);
    }

    public toJSON(): object {
        return this.payload;
    }
}
