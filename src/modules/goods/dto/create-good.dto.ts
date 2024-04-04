import { IsOptional, IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateGoodDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one catalog ID must be provided' })
  @IsString({ each: true, message: 'All values in the array must be strings' })
  catalogIds: string[];
}