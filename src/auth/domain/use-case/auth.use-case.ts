import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { IUserRepo } from "../contract/user-repo.contract";
import { Token, TokenPayload } from "../model/token.model";
import { ICryptoService } from "../contract/crypto-service.contract";
import { ITokenService } from "../contract/token-service.contract";
import { ITokenRepo } from "../contract/token-repo.contract";
import * as dayjs from "dayjs";

export class AuthUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly tokenRepo: ITokenRepo,
    private readonly cryptoService: ICryptoService,
    private readonly tokenService: ITokenService
  ) {}

  // todo: add email/phone
  public async logIn({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<Token> {
    const user = await this.userRepo.getUserByLogin(login);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    if (!user.isActive) {
      throw new UnauthorizedException("User is inactive");
    }

    const isPasswordValid = await this.cryptoService.comparePassword(
      password,
      user.hashPassword
    );
    if (!isPasswordValid) {
      throw new ForbiddenException("Wrong password");
    }

    const tokenPair = await this.createNewTokenPair(user.id);

    return tokenPair;
  }

  public async refreshToken(refreshToken: string): Promise<Token> {
    const oldToken = await this.tokenRepo.getByRefreshToken(refreshToken);
    if (!oldToken) {
      throw new BadRequestException("refresh token not found");
    }
    await this.tokenRepo.removeRefreshToken(oldToken.refreshToken);

    const newTokenPair = await this.createNewTokenPair(oldToken.userId);

    return newTokenPair;
  }

  public async register({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<Token> {
    const existedUser = await this.userRepo.getUserByLogin(login);

    if (existedUser) {
      throw new BadRequestException("Login is already taken");
    }

    const passwordHash = await this.cryptoService.hashPassword(password);
    const { userId } = await this.userRepo.createUser({ login, passwordHash });

    const tokenPair = await this.createNewTokenPair(userId);

    return tokenPair;
  }

  private async createNewTokenPair(userId: string): Promise<Token> {
    const tokenPayload: TokenPayload = { userId }; // todo: getting user info by user id for other payload properties
    const tokenPair = await this.tokenService.createTokenPair(tokenPayload);

    await this.tokenRepo.addResfreshTokenToUser(
      userId,
      tokenPair.refreshToken,
      dayjs().add(5, "day").toDate() // refresh token lifes for 5 days
    );

    return tokenPair;
  }
}
