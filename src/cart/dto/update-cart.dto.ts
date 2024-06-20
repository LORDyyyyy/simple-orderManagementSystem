import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
