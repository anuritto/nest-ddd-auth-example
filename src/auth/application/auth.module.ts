import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { TokenRepo } from "../infrastructure/repo/token.repo";
import { CryptoService } from "../infrastructure/service/crypto.service";
import { TokenService } from "../infrastructure/service/token.service";
import { UserRepo } from "../infrastructure/repo/user.repo";
import { PrismaModule } from "../../common/prisma/prisma.module";

@Module({
  controllers: [AuthController],
  providers: [UserRepo, TokenRepo, CryptoService, TokenService],
  imports: [PrismaModule],
})
export class AuthModule {}
