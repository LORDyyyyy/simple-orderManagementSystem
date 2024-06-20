import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);

    if (Object.keys(order).includes('error')) {
      throw new BadRequestException((order as any).error.message);
    }

    return order;
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = this.orderService.create(createOrderDto);

    if (Object.keys(order).includes('error')) {
      throw new BadRequestException((order as any).error.message);
    }

    return order;
  }
}
