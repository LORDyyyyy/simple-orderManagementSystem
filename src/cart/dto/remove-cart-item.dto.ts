import { IsNotEmpty, IsInt } from 'class-validator';

export class RemoveCartItemDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;
}
