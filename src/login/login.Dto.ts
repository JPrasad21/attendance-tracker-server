import { Prop } from "@nestjs/mongoose";

export class LoginDto {

    @Prop({
        type: 'string',
        required: true
    })
    username: string;

    @Prop({
        type: 'string',
        required: true
    })
    password: string;
}
