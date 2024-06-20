import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cartService: CartService,
  ) {}

  async findOne(orderId: number) {
    const order = await this.databaseService.order.findFirst({
      where: { orderId },
    });

    if (!order) return { error: { message: 'Order was not found' } };

    return order;
  }

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.databaseService.user.findUnique({
      where: { userId: createOrderDto.userId },
    });

    if (!user) return { error: { message: 'User was not found' } };

    const userId = createOrderDto.userId;

    const cart = await this.cartService.getOrCeateEmptyCard(userId);

    const cartId = cart.cartId;

    const cartItems = await this.databaseService.cartItem.findMany({
      where: { cartId },
    });

    console.log(cartItems);

    return {};
  }

  // update(updateOrderDto: UpdateOrderDto) {}
}
