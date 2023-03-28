import { WelcomeEmail } from "../interfaces/welcome-email.interface";
export class SendWelcomeEmail implements WelcomeEmail {
    id!:Number;
    email!: string;
    dateTimeStamp!: Date;
    template!: string;
}
