import { UserDto } from 'src/users/dto/user.dto';

export const userStub = (): UserDto => {
  return {
    id: 1,
    username: 'John',
    email: 'johnDoe@gmail.com'
  };
};
