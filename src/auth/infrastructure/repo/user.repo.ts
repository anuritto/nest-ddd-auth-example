import { Injectable } from "@nestjs/common";
import { IUserRepo } from "../../domain/contract/user-repo.contract";
import { User, UserInfo } from "../../domain/model/user.model";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser({
    login,
    passwordHash,
  }: {
    login: string;
    passwordHash: string;
  }): Promise<{ userId: string }> {
    const { id: userId } = await this.prismaService.user.create({
      data: {
        login,
        hashPassword: passwordHash,
        isActive: true,
      },
      select: { id: true },
    });
    return { userId };
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user =
      (await this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          login: true,
          hashPassword: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      })) || undefined;
    return user;
  }

  async getUserInfoById(id: string): Promise<UserInfo | undefined> {
    const user =
      (await this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          login: true,
          isActive: true,
        },
      })) || undefined;
    return user;
  }

  async getUserByLogin(userName: string): Promise<User | undefined> {
    const user =
      (await this.prismaService.user.findUnique({
        where: { login: userName },
        select: {
          id: true,
          login: true,
          hashPassword: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      })) || undefined;
    return user;
  }
}
