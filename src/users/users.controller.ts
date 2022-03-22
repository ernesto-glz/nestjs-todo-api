import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Res,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from '../shared/auth.guard';
import { UserDecorator } from './user.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/signIn')
  signIn(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Res() response: Response
  ): Promise<void> {
    return this.usersService.signIn(loginUserDto, response);
  }

  @Patch('/updatePassword')
  @UseGuards(new AuthGuard())
  findOne(
    @UserDecorator('id') userId: number,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
    @Res() response: Response
  ): Promise<void> {
    return this.usersService.updatePassword(
      userId,
      updatePasswordDto,
      response
    );
  }
}
