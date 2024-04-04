import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatalogDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}