import { IsOptional, IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateGoodDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one item must be selected' })
  @IsString({ each: true, message: 'All values in the array must be strings' })
  catalogIds: string[];
}