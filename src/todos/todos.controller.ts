import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../shared/auth.guard';
import { UserDecorator } from '../users/user.decorator';
import { Todo } from './entities/todo.entity';
import { UserDto } from '../users/dto/user.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(new AuthGuard())
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @UserDecorator() user: UserDto
  ): Promise<Todo> {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  @UseGuards(new AuthGuard())
  findAll(@UserDecorator('id') userId: number): Promise<Todo[]> {
    return this.todosService.findAllByUserId(userId);
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  findOne(
    @Param('id') id: number,
    @UserDecorator('id') userId: number
  ): Promise<Todo> {
    return this.todosService.findOne(id, userId);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
    @UserDecorator('id') userId: number
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto, userId);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  remove(
    @Param('id') id: number,
    @UserDecorator('id') userId: number
  ): Promise<object> {
    return this.todosService.remove(id, userId);
  }
}
