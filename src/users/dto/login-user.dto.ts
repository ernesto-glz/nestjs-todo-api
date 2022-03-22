import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_]+$/, { message: 'Please enter a valid username' })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
