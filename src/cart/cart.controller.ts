import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cart-item.dto';
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cart = await this.cartService.findOne(id);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }

  @Post('/add')
  /**
   * Creates a new cart.
   *
   * @param createCartDto - The data required to create a new cart.
   * @returns The created cart.
   */
  async create(@Body() createCartDto: CreateCartDto) {
    const cart = await this.cartService.create(createCartDto);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }

  @Put('/update')
  async update(@Body() updateCartDto: UpdateCartDto) {
    const cart = await this.cartService.update(updateCartDto);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }

  @Delete('/remove')
  async remove(@Body() removeCartItemDto: RemoveCartItemDto) {
    const cart = await this.cartService.removeFromCart(removeCartItemDto);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }
}
