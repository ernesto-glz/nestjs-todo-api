import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
