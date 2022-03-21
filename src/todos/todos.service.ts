import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private readonly NAN_ID = 'Id must be a number';

  constructor(
    @InjectRepository(Todo, 'todosConnection')
    private readonly todosRepo: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const { title } = createTodoDto;
    const todo = this.todosRepo.create(createTodoDto);

    const todoExists = await this.todosRepo.findOne({
      title,
      completed: false
    });

    if (todoExists) {
      throw new ConflictException(['Todo with that title already exists']);
    }

    return await this.todosRepo.save(todo);
  }

  async findAll() {
    return await this.todosRepo.find();
  }

  async findOne(id: number) {
    if (isNaN(id)) throw new BadRequestException([this.NAN_ID]);

    const todo = await this.todosRepo.findOne({ id });
    if (!todo) {
      throw new NotFoundException(['Todo not found']);
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    if (isNaN(id)) throw new BadRequestException([this.NAN_ID]);

    const todoExists = await this.todosRepo.findOne({ id });
    if (!todoExists) {
      throw new NotFoundException(['Todo not found']);
    }

    await this.todosRepo.update(id, updateTodoDto);

    return await this.todosRepo.findOne({ id });
  }

  async remove(id: number) {
    if (isNaN(id)) throw new BadRequestException([this.NAN_ID]);

    const result = await this.todosRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(['Todo not found']);
    }

    return result;
  }
}
