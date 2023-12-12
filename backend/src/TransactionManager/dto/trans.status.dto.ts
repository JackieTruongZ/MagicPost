import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TransStatusDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  quantityTransaction: number;
}
