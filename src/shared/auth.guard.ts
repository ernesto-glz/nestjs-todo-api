import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private decoded: any;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateToken(request);
  }

  private async validateToken(request: any): Promise<boolean> {
    let token: string;

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    )
      token = request.headers.authorization.split(' ')[1];
    else if (request.cookies?.jwt) {
      token = request.cookies.jwt;
    }

    if (!token) {
      throw new UnauthorizedException([
        'You are not logged in! Please log in to get access.'
      ]);
    }

    try {
      this.decoded = verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || this.decoded === undefined) {
        throw new UnauthorizedException([
          'Invalid Token. Please log in again!'
        ]);
      }

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException([
          'Your token has expired! Please log in again'
        ]);
      }

      if (error) {
        throw new InternalServerErrorException([
          'Something went wrong! Please try again later'
        ]);
      }
    }

    const userExists = await getRepository(User).findOne({
      where: { id: this.decoded.id }
    });

    if (!userExists) {
      throw new UnauthorizedException([
        'The account belonging to this token does no longer exist.'
      ]);
    }

    delete userExists.password;

    request.user = { ...userExists };
    return true;
  }
}
