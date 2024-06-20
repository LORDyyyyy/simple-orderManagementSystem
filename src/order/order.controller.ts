import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApplyCouponDto } from 'src/coupon/dto/apply-coupon.dto';
import { CouponService } from 'src/coupon/coupon.service';
import { $Enums, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('api/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly couponService: CouponService,
  ) {}

  /**
   * GET /api/orders/:id
   * Retrieves a single order by its ID.
   *
   * @param id - The ID of the order to retrieve.
   * @returns A Promise that resolves to the retrieved order.
   * @throws BadRequestException if the order is not found or an error occurs.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);

    if (Object.keys(order).includes('error')) {
      throw new BadRequestException((order as any).error.message);
    }

    return order;
  }

  /**
   * POST /api/orders
   * Create a new order based on the user's cart.
   *
   * @param createOrderDto - The data for creating the order.
   * @returns The created order.
   * @throws BadRequestException if there is an error creating the order.
   */
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);

    if (Object.keys(order).includes('error')) {
      throw new BadRequestException((order as any).error.message);
    }

    return order;
  }

  /**
   * PUT /api/orders/:id/status
   * Updates the status of an order.
   *
   * @param id - The ID of the order to update.
   * @param updateOrderDto - The DTO containing the updated order information.
   * @returns The updated order.
   * @throws BadRequestException if there is an error updating the order.
   */
  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    updateOrderDto.status =
      updateOrderDto.status.toUpperCase() as $Enums.Status;
    const updatedOrder = await this.orderService.updateStatus(
      id,
      updateOrderDto,
    );

    if (Object.keys(updatedOrder).includes('error')) {
      throw new BadRequestException((updatedOrder as any).error.message);
    }

    return updatedOrder;
  }

  /**
   * POST /api/orders/apply-coupon
   * Apply a coupon to an order.
   *
   * @param applyCouponDto - The DTO containing the coupon information.
   * @returns A message indicating the discount applied.
   * @throws BadRequestException if there is an error applying the coupon or retrieving the order.
   */
  @Post('/apply-coupon')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    const coupon = await this.couponService.getCoupun(applyCouponDto);

    if (Object.keys(coupon).includes('error')) {
      throw new BadRequestException((coupon as any).error.message);
    }

    const order = await this.orderService.applyCoupon(
      applyCouponDto,
      coupon as Prisma.CouponUncheckedCreateInput,
    );

    if (Object.keys(order).includes('error')) {
      throw new BadRequestException((order as any).error.message);
    }

    return {
      message: `Applied ${(coupon as any).discount}% of`,
    };
  }
}
