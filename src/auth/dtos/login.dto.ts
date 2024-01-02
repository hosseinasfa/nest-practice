import { IsString, IsEmail, Length } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(5,20)
    password: string
}