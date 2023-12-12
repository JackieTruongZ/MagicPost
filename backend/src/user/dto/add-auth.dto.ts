import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddAuthDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsOptional()
  @IsString()
  transId?: string;
  @IsOptional()
  @IsString()
  hubId?: string;
}
