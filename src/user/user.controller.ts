import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * GET /api/users/:id/orders
   * Retrieves the orders for a user with the specified ID.
   *
   * @param id - The ID of the user.
   * @returns A Promise that resolves to the orders of the user.
   * @throws BadRequestException if there is an error retrieving the orders.
   */
  @Get(':id/orders')
  async getOrders(@Param('id', ParseIntPipe) id: number) {
    const orders = await this.userService.getOrders(id);

    if (Object.keys(orders).includes('error')) {
      throw new BadRequestException((orders as any).error.message);
    }

    return orders;
  }
}
