import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Misc } from '../shared/misc';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDto } from './dto/user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class UsersService {
  private readonly Responses = {
    USER_ALREADY_EXISTS: 'User already exists',
    PWD_NOT_MATCH: 'Password does not match',
    WRONG_USER_OR_PWD: 'Incorrect username or password',
    WRONG_PWD: 'Incorrect password',
    USER_NOT_FOUND: 'User not found',
    PWD_UPDATED: 'Your password has been updated successfully!',
    EMAIL_UPDATED: 'Your email has been updated successfully!'
  };

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async signUp(
    createUserDto: CreateUserDto,
    response: Response
  ): Promise<void> {
    const { username, password, passwordConfirm, email } = createUserDto;
    const newUser = this.userRepo.create();

    const userExists = await this.userRepo.findOne({ username });

    if (userExists) {
      throw new ConflictException([this.Responses.USER_ALREADY_EXISTS]);
    }

    if (password !== passwordConfirm) {
      throw new BadRequestException([this.Responses.PWD_NOT_MATCH]);
    }

    newUser.username = username;
    newUser.password = await Misc.hashPassword(password);
    newUser.email = email;

    const user = await this.userRepo.save(newUser);

    UsersService.createToken(user, HttpStatus.CREATED, response);
  }

  async signIn(loginUserDto: LoginUserDto, response: Response): Promise<void> {
    const { username, password } = loginUserDto;

    const user = await this.userRepo.findOne({ username });

    if (!user) {
      throw new NotFoundException([this.Responses.USER_NOT_FOUND]);
    }

    if (!(await Misc.checkCredentials(password, user.password))) {
      throw new UnauthorizedException([this.Responses.WRONG_USER_OR_PWD]);
    }

    UsersService.createToken(user, HttpStatus.OK, response);
  }

  async updateEmail(
    userId: number,
    updateEmailDto: UpdateEmailDto,
    response: Response
  ): Promise<void> {
    const { email } = updateEmailDto;

    await this.userRepo.update(userId, { email });

    response
      .status(HttpStatus.OK)
      .send({ status: 'success', message: [this.Responses.EMAIL_UPDATED] });
  }

  async updatePassword(
    user: User,
    updatePasswordDto: UpdatePasswordDto,
    response: Response
  ): Promise<void> {
    const { currentPassword, password, passwordConfirm } = updatePasswordDto;

    if (password !== passwordConfirm) {
      throw new UnauthorizedException([this.Responses.PWD_NOT_MATCH]);
    }

    if (!(await Misc.checkCredentials(currentPassword, user.password))) {
      throw new UnauthorizedException([this.Responses.WRONG_PWD]);
    }

    await this.userRepo.update(user.id, {
      password: await Misc.hashPassword(password)
    });

    response
      .status(HttpStatus.OK)
      .send({ status: 'success', message: [this.Responses.PWD_UPDATED] });
  }

  async getUserInfoById(userId: number): Promise<UserDto> {
    const user = await this.userRepo.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException([this.Responses.USER_NOT_FOUND]);
    }

    delete user.password;
    return user;
  }

  private static createToken(
    user: any,
    statusCode: number,
    response: Response
  ) {
    const token = sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    delete user.password;

    response.status(statusCode).json({ token, user });
  }
}
