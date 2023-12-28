import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class GetAllOrders{
    @IsOptional()
    @IsString()
    type:string;
  }
  