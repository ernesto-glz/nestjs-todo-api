import {
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class TodoDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(4)
  @MaxLength(40)
  title: string;

  @IsString()
  @MaxLength(250)
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  createdAt: string;

  @IsString()
  lastUpdated: string;
}
