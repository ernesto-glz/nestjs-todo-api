import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Misc } from 'src/shared/misc';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, passwordConfirm, email } = createUserDto;
    const newUser = this.userRepo.create();

    const userExists = await this.userRepo.findOne({ username });

    if (userExists) {
      throw new ConflictException(['User already exists']);
    }

    if (password !== passwordConfirm) {
      throw new BadRequestException(['Password does not match']);
    }

    newUser.username = username;
    newUser.password = await Misc.hashPassword(password);
    newUser.email = email;

    return await this.userRepo.save(newUser);
  }

  async signIn(loginUserDto: LoginUserDto, response: Response) {
    const { username, password } = loginUserDto;

    const user = await this.userRepo.findOne({ username });

    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    if (!(await Misc.checkCredentials(password, user.password))) {
      throw new UnauthorizedException(['Incorrect username or password']);
    }

    delete user.password;

    UsersService.createToken(user, HttpStatus.CREATED, response);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
