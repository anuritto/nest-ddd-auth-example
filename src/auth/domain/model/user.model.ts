export type User = {
  id: string;
  login: string;
  // todo: add first/last name
  // todo: add phone
  // todo: email?
  // todo: role
  hashPassword: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // todo: soft deleting
  // deletedAt: Date | null;
};

export type UserInfo = Pick<User, "id" | "login" | "isActive">;
