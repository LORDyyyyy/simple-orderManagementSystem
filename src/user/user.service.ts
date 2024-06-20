import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModule } from './user.module';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<UserModule[]> {
    return this.databaseService.user.findMany();
  }

  async findOne(userId: number): Promise<UserModule> {
    return this.databaseService.user.findUnique({
      where: { userId },
    });
  }

  async create(user: CreateUserDto): Promise<UserModule> {
    const isEmailTaker = await this.databaseService.user.findUnique({
      where: { email: user.email },
    });

    if (isEmailTaker) {
      throw new BadRequestException('Email already taken');
    }

    return this.databaseService.user.create({
      data: user,
    });
  }
}
