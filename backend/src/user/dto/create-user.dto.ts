import {
  IsEmail, IsNotEmpty, IsNumber,
  IsString
} from "class-validator";

export class CreateUserDto{
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
