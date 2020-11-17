import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(CreateUserService);
    const { name, email, password } = request.body;

    const user = await userService.execute({ name, email, password });

    delete user.password;

    return response.json(classToClass(user));
  }
}
