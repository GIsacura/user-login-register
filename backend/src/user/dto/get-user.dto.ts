import { IsOptional, IsPositive, Min } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsPositive()
  count: number;

  @IsOptional()
  @Min(0)
  page: number;
}
