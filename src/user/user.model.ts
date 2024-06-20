import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  userId?: number;
  name: string;
  email: string;
  password: string;
  address: string;
}
