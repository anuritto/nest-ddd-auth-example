import { Injectable } from "@nestjs/common";
import { ICryptoService } from "../../domain/contract/crypto-service.contract";
import { hash, compare, genSaltSync } from "bcrypt";

// todo: move to env
const SECRET_SALT = "aboba";

@Injectable()
export class CryptoService implements ICryptoService {
  hashPassword(password: string): Promise<string> {
    const salt = genSaltSync(10);
    return hash(password + SECRET_SALT + salt, 10);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    const salt = genSaltSync(10);
    return compare(password + SECRET_SALT + salt, hash);
  }
}
