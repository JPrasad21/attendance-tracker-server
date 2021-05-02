import { Prop } from "@nestjs/mongoose";

export class LoginDto {

    @Prop({
        type: 'string',
        required: true
    })
    email: string;

    @Prop({
        type: 'string',
        required: true
    })
    password: string;
}
