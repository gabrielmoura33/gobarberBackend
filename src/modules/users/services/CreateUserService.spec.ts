import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from anther one', async () => {
    await createUser.execute({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Due',
        email: 'johndoew@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
