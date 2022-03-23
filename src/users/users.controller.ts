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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserInfo(@Param('id') userId: number): Promise<UserDto> {
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
