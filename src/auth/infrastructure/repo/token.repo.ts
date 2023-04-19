import { Injectable } from "@nestjs/common";
import { ITokenRepo } from "../../domain/contract/token-repo.contract";
import { RefreshToken } from "../../domain/model/token.model";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class TokenRepo implements ITokenRepo {
  constructor(private readonly prismaService: PrismaService) {}
  async addResfreshTokenToUser(
    userId: string,
    refreshToken: string,
    expiredAt: Date
  ): Promise<void> {
    await this.prismaService.token.create({
      data: {
        refresh: refreshToken,
        user: { connect: { id: userId } },
        expiredAt,
      },
    });
  }
  async getByRefreshToken(
    refreshToken: string
  ): Promise<RefreshToken | undefined> {
    const token = await this.prismaService.token.findUnique({
      where: { refresh: refreshToken },
      select: { refresh: true, userId: true },
    });
    if (!token) {
      return;
    }

    return {
      refreshToken: token.refresh,
      userId: token.userId,
    };
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    await this.prismaService.token.delete({
      where: {
        refresh: refreshToken,
      },
    });
  }
}
