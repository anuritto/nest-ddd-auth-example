import { Token, TokenPayload } from "../model/token.model";

export interface ITokenService {
  createTokenPair(tokenPayload: TokenPayload): Promise<Token>;
}
