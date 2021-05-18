import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class PhoneUpdateDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsNumber()
  @Transform(p => parseInt(p.value, 10), { toClassOnly: true })
  price: number;

  @IsObject()
  @IsOptional()
  imageFile: any;

  @IsString()
  screen: string;

  @IsString()
  processor: string;

  @IsInt()
  @Transform(p => parseInt(p.value, 10), { toClassOnly: true })
  ram: number;
}