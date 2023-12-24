import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAllUsers{
  @IsOptional()
  @IsString()
  type:string;
}
