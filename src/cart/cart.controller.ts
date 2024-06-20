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

  /**
   * GET /api/cart/:id
   * Retrieves a cart by its ID.
   *
   * @param id - The ID of the cart to retrieve.
   * @returns A Promise that resolves to the cart object.
   * @throws BadRequestException if the cart is not found or an error occurs.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cart = await this.cartService.findCart(id);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }

  /**
   * POST /api/cart/add
   * Create a new cart.
   *
   * @param createCartDto - The data for creating the cart.
   * @returns The created cart.
   * @throws BadRequestException if there is an error creating the cart.
   */
  @Post('/add')
  async create(@Body() createCartDto: CreateCartDto) {
    const cart = await this.cartService.create(createCartDto);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }

  /**
   * PUT /api/cart/update
   * Updates the cart with the provided data.
   *
   * @param updateCartDto - The data to update the cart with.
   * @returns The updated cart.
   * @throws BadRequestException if there is an error updating the cart.
   */
  @Put('/update')
  async update(@Body() updateCartDto: UpdateCartDto) {
    const cart = await this.cartService.update(updateCartDto);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }

  /**
   * DELETE /api/cart/remove
   * Removes an item from the cart.
   *
   * @param removeCartItemDto - The DTO containing information about the item to be removed.
   * @returns The updated cart after removing the item.
   * @throws BadRequestException if there is an error removing the item from the cart.
   */
  @Delete('/remove')
  async remove(@Body() removeCartItemDto: RemoveCartItemDto) {
    const cart = await this.cartService.removeFromCart(removeCartItemDto);

    if (Object.keys(cart).includes('error')) {
      throw new BadRequestException((cart as any).error.message);
    }

    return cart;
  }
}
