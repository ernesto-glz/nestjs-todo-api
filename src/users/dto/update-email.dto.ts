import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/, {
    message: 'Email must be a Gmail address'
  })
  email: string;
}
