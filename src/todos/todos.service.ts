import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private readonly Responses = {
    ID_NAN: 'Id must be a number',
    NOT_FOUND: 'Todo not found',
    ALREADY_EXISTS: 'Todo already exists',
    ACCESS_DENIED: "You can't access a todo that doesn't belong to you"
  };

  constructor(
    @InjectRepository(Todo)
    private readonly todosRepo: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title } = createTodoDto;
    const todo = this.todosRepo.create({ ...createTodoDto, user });

    const todoExists = await this.todosRepo.findOne({
      title,
      completed: false
    });

    if (todoExists) {
      throw new ConflictException([this.Responses.ALREADY_EXISTS]);
    }

    return await this.todosRepo.save(todo);
  }

  async findAllByUserId(userId: number): Promise<Todo[]> {
    const todos = await this.todosRepo.find({
      where: { user: { id: userId } },
      relations: ['user']
    });

    if (todos.length) {
      todos.forEach((todo) => {
        delete todo.user?.password;
      });
    }

    return todos;
  }

  async findOne(id: number, userId: number): Promise<Todo> {
    if (isNaN(id)) throw new BadRequestException([this.Responses.ID_NAN]);

    const todo = await this.todosRepo.findOne({
      where: { id },
      relations: ['user']
    });

    if (!todo) {
      throw new NotFoundException([this.Responses.NOT_FOUND]);
    }

    if (todo.user.id !== userId) {
      throw new UnauthorizedException([this.Responses.ACCESS_DENIED]);
    }

    delete todo.user.password;
    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId: number
  ): Promise<Todo> {
    if (isNaN(id)) throw new BadRequestException([this.Responses.ID_NAN]);

    const todo = await this.todosRepo.findOne({
      where: { id },
      relations: ['user']
    });

    if (!todo) {
      throw new NotFoundException([this.Responses.NOT_FOUND]);
    }

    if (todo.user.id !== userId) {
      throw new UnauthorizedException([this.Responses.ACCESS_DENIED]);
    }

    await this.todosRepo.update(id, updateTodoDto);

    return await this.todosRepo.findOne({ id });
  }

  async remove(id: number, userId: number): Promise<object> {
    if (isNaN(id)) throw new BadRequestException([this.Responses.ID_NAN]);

    const todo = await this.todosRepo.findOne({
      where: { id },
      relations: ['user']
    });

    if (!todo) {
      throw new NotFoundException([this.Responses.NOT_FOUND]);
    }

    if (todo.user.id !== userId) {
      throw new UnauthorizedException([this.Responses.ACCESS_DENIED]);
    }

    delete todo.user;
    await this.todosRepo.delete({ id });

    return { status: 'Deleted', ...todo };
  }
}
