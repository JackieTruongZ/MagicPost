import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class HubStatusDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  quantityHub: number;
}
