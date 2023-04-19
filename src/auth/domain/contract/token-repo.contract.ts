import { RefreshToken } from "../model/token.model";

export interface ITokenRepo {
  addResfreshTokenToUser(
    userId: string,
    refreshToken: string,
    expiredAt: Date
  ): Promise<void>;
  getByRefreshToken(refreshToken: string): Promise<RefreshToken | undefined>;
  removeRefreshToken(refreshToken: string): Promise<void>;
}
