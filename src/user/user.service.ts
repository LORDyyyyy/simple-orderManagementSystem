import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly orderService: OrderService,
  ) {}

  async getOrders(userId: number) {
    const user = await this.databaseService.user.findUnique({
      where: { userId },
    });

    if (!user) return { error: { message: 'User was not found' } };

    const orders = await this.databaseService.order.findMany({
      where: { userId },
    });

    return Promise.all(
      orders.map(async (order) => {
        return await this.orderService.findOne(order.orderId);
      }),
    );
  }
}
