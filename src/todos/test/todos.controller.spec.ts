import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodosController } from '../todos.controller';
import { TodosService } from '../todos.service';
import { userStub } from './stubs/user.stub';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  const mockTodosService = {
    create: jest.fn((createTodoDto, userDto) => {
      return {
        id: Date.now(),
        ...createTodoDto,
        ...userDto
      };
    }),
    update: jest.fn((id, updateTodoDto, userId) => {
      return {
        id,
        ...updateTodoDto,
        userId
      };
    }),
    findAllByUserId: jest.fn(() => {
      return [];
    }),
    findOne: jest.fn((id, userId) => {
      return {
        id,
        title: 'test',
        description: 'test',
        userId
      };
    }),
    remove: jest.fn((id, userId) => {
      return {
        status: 'success',
        id,
        title: 'test',
        description: 'test',
        userId
      };
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService]
    })
      .overrideProvider(TodosService)
      .useValue(mockTodosService)
      .compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  describe('create', () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test',
      description: 'Test',
      completed: false
    };

    test('should return a created todo', () => {
      const result = todosController.create(createTodoDto, userStub());

      expect(result).toEqual({
        id: expect.any(Number),
        ...createTodoDto,
        ...userStub()
      });

      expect(todosService.create).toBeCalledWith(createTodoDto, userStub());
      expect(todosService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    test('should return a todo array', () => {
      expect(todosController.findAll(1)).toHaveLength(
        mockTodosService.findAllByUserId().length
      );

      expect(todosService.findAllByUserId).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    test('should return one todo', () => {
      const id = 1;
      const userId = 33;

      expect(todosController.findOne(id, userId)).toEqual(
        mockTodosService.findOne(id, userId)
      );

      expect(todosService.findOne).toHaveBeenCalledWith(id, userId);
    });
  });

  describe('update', () => {
    const updateTodoDto: UpdateTodoDto = {
      title: 'Updated',
      description: 'updated desc',
      completed: false
    };

    test('should return a updated todo', () => {
      const id = 1;
      const userId = 10;

      expect(todosController.update(id, updateTodoDto, userId)).toEqual({
        id,
        ...updateTodoDto,
        userId
      });

      expect(todosService.update).toHaveBeenCalledWith(
        id,
        updateTodoDto,
        userId
      );
    });
  });

  describe('delete', () => {
    test('should return a deleted todo', () => {
      const id = 3;
      const userId = 10;

      expect(todosController.remove(id, userId)).toEqual(
        mockTodosService.remove(id, userId)
      );

      expect(todosService.remove).toHaveBeenCalled();
    });
  });
});
