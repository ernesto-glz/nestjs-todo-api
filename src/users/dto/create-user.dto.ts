import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches
} from 'class-validator';

export class CreateUserDto {
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

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/, {
    message: 'Email must be a Gmail address'
  })
  email: string;
}
