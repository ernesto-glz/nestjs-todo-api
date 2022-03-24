import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Res,
  UseGuards,
  Get,
  Param
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from '../shared/auth.guard';
import { UserDecorator } from './user.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDto } from './dto/user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(new AuthGuard())
  getUserInfo(@UserDecorator('id') userId: number): Promise<UserDto> {
    return this.usersService.getUserInfoById(userId);
  }

  @Post('/signUp')
  create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() response: Response
  ): Promise<void> {
    return this.usersService.signUp(createUserDto, response);
  }

  @Post('/signIn')
  signIn(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Res() response: Response
  ): Promise<void> {
    return this.usersService.signIn(loginUserDto, response);
  }

  @Patch('/email')
  @UseGuards(new AuthGuard())
  updateEmail(
    @UserDecorator('id') userId: number,
    @Body(ValidationPipe) updateEmaiDto: UpdateEmailDto,
    @Res() response: Response
  ): Promise<void> {
    return this.usersService.updateEmail(userId, updateEmaiDto, response);
  }

  @Patch('/password')
  @UseGuards(new AuthGuard())
  updatePassword(
    @UserDecorator() user: User,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
    @Res() response: Response
  ): Promise<void> {
    return this.usersService.updatePassword(user, updatePasswordDto, response);
  }
}
