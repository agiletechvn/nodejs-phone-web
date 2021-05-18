import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";


export class Phone {

  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsString()
  imageFileName: string;

  @IsString()
  screen: string;

  @IsString()
  processor: string;

  @IsInt()
  ram: number;
}