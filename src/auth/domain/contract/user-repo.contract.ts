import { User, UserInfo } from "../model/user.model";

type CreateUserDto = {
  login: string;
  passwordHash: string;
};

export interface IUserRepo {
  getUserById(id: string): Promise<User | undefined>;
  getUserInfoById(id: string): Promise<UserInfo | undefined>;
  getUserByLogin(login: string): Promise<User | undefined>;
  createUser(dto: CreateUserDto): Promise<{ userId: string }>;
}
