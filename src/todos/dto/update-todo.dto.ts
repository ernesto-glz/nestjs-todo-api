import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsOptional
} from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
