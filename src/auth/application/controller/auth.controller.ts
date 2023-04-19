import { Body, Controller, Post } from "@nestjs/common";
import { AuthUseCase } from "../../domain/use-case/auth.use-case";
import { ReturnData } from "../../../common/type/return-data.type";
import { LogInDto, RefreshTokenDto, RegisterDto } from "../dto/auth.dto";
import { Token } from "../../domain/model/token.model";
import { TokenRepo } from "../../infrastructure/repo/token.repo";
import { CryptoService } from "../../infrastructure/service/crypto.service";
import { TokenService } from "../../infrastructure/service/token.service";
import { UserRepo } from "../../infrastructure/repo/user.repo";

@Controller("auth")
export class AuthController {
  // todo: add solt from env
  //  private readonly solt: string
  private readonly authUseCase: AuthUseCase;

  constructor(
    userRepo: UserRepo,
    tokenRepo: TokenRepo,
    cryptoService: CryptoService,
    tokenService: TokenService
  ) {
    this.authUseCase = new AuthUseCase(
      userRepo,
      tokenRepo,
      cryptoService,
      tokenService
    );
  }

  @Post("/login")
  async logIn(
    @Body()
    { password, login }: LogInDto
  ): Promise<ReturnData<Token>> {
    const token = await this.authUseCase.logIn({ password, login });
    return { data: token };
  }

  @Post("/refresh")
  async refreshToken(
    @Body()
    { refreshToken }: RefreshTokenDto
  ): Promise<ReturnData<Token>> {
    const token = await this.authUseCase.refreshToken(refreshToken);
    return { data: token };
  }

  @Post("/register")
  async register(
    @Body()
    { password, login }: RegisterDto
  ): Promise<ReturnData<Token>> {
    const token = await this.authUseCase.register({ password, login });
    return { data: token };
  }
}
