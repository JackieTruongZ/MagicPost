import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { AuthDto } from "./auth.dto";

export class AuthSignupDto extends AuthDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
