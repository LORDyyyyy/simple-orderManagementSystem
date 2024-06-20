import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { $Enums } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(['PENDING', 'DELIVERED', 'CANCELED'])
  status: $Enums.Status;

  @IsInt()
  @IsNotEmpty()
  orderId;
}
