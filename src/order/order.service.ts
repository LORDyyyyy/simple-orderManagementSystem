import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

    const orderItems = await this.databaseService.orderItem.findMany({
      where: { orderId },
    });

    for (const item of orderItems) {
      const product = await this.databaseService.product.findFirst({
        where: { productId: item.productId },
      });

      item['totalPrice'] = item.quantity * product.price;
    }

    const buyerAddress = (
      await this.databaseService.user.findFirst({
        where: { userId: order.userId },
      })
    ).address;

    return { ...order, buyerAddress, items: orderItems };
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

    if (cartItems.length === 0)
      return { error: { message: 'Your cart is empty' } };

    let fullPrice = 0.0;
    const productsInCart = [];
    const productsInCartOutOfStock = [];

    for await (const item of cartItems) {
      const product = await this.databaseService.product.findFirst({
        where: { productId: item.productId },
      });

      if (!this.cartService.checkEnoughStock(product, item.quantity)) {
        productsInCartOutOfStock.push(product);
        continue;
      }

      fullPrice += product.price * item.quantity;
      productsInCart.push(product);
    }

    if (productsInCartOutOfStock.length !== 0) {
      return productsInCartOutOfStock.map((product) => {
        return {
          currentStock: product.stock,
          productId: product.productId,
          wantedQuantity: cartItems.find(
            (e) => e.productId === product.productId,
          ).quantity,
          message: `There is not enoughe stock for the Product with ID ${product.productId}`,
        };
      });
    }

    const order = await this.databaseService.order.create({
      data: {
        userId,
        total: fullPrice,
      },
    });

    for (const item in cartItems) {
      await this.databaseService.orderItem.create({
        data: {
          quantity: cartItems[item].quantity,
          orderId: order.orderId,
          productId: cartItems[item].productId,
        },
      });

      await this.databaseService.product.update({
        data: { stock: productsInCart[item].stock - cartItems[item].quantity },
        where: { productId: cartItems[item].productId },
      });
    }

    return await this.databaseService.cartItem.deleteMany({
      where: { cartId },
    });
  }

  async updateStatus(orderId: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.databaseService.order.findFirst({
      where: { orderId },
    });

    if (!order) return { error: { message: 'Order was not found' } };

    return this.databaseService.order.update({
      data: { status: updateOrderDto.status },
      where: { orderId },
    });
  }
}
