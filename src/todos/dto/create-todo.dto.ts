import {
  MinLength,
  MaxLength,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional
} from 'class-validator';

export class CreateTodoDto {
  @MinLength(4)
  @MaxLength(40)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MaxLength(250)
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  completed?: boolean;
}
