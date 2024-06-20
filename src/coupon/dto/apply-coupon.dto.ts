import { IsAlphanumeric, IsInt, IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  code;

  @IsNotEmpty()
  @IsInt()
  orderId: number;
}
