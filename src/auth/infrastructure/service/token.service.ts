import { Injectable } from "@nestjs/common";
import { ITokenService } from "../../domain/contract/token-service.contract";
import { TokenPayload, Token } from "../../domain/model/token.model";
import { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";

// todo: move to env
const SECRET_JWT_SALT = "aboboba";
@Injectable()
export class TokenService implements ITokenService {
  async createTokenPair(tokenPayload: TokenPayload): Promise<Token> {
    const refreshToken = await genSalt();
    const accessToken = sign(tokenPayload, SECRET_JWT_SALT);

    return { refreshToken, accessToken };
  }
}
