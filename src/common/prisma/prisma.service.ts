import { OnModuleInit, Injectable, Scope } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({ scope: Scope.TRANSIENT })
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    // todo: add soft delete middleware
    await this.$connect();
  }
}
