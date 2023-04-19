import { IsString, Length } from "class-validator";

export class LogInDto {
  @IsString()
  @Length(6, 20)
  password!: string;

  @IsString()
  @Length(3, 20)
  login!: string;
}
export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class RegisterDto {
  @IsString()
  @Length(6, 20)
  password!: string;

  @IsString()
  @Length(3, 20)
  login!: string;
}
