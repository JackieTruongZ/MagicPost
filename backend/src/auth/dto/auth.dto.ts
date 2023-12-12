import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  
  email?: string;

  username?: string;

  password: string;
}
