import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

const Status = ['PENDING', 'DELIVERED'];

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Status, {
    message: `status must be one of the following values: ${Status}`,
  })
  status: $Enums.Status;
}
