import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { AuthDto } from "./auth.dto";

export class AuthSigninDto extends AuthDto{
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
