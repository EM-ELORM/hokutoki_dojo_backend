import { IsNotEmpty, IsString } from 'class-validator'
import { Optional } from '@nestjs/common'

export class SendTgInput {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    @Optional()
    socialLink?: string | null

    @IsString()
    @IsNotEmpty()
    training: string

    @IsString()
    @IsNotEmpty()
    chatKey: string
}