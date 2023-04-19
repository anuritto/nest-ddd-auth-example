export type Token = {
  /** jwt access token with payload */
  accessToken: string;
  /** uniq refresh string-token saved in db for user */
  refreshToken: string;
};

export type RefreshToken = {
  refreshToken: string;
  userId: string;
};

export type TokenPayload = {
  userId: string;
};
