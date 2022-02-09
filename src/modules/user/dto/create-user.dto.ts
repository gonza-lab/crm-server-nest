import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString() first_name: string;
  @IsString() last_name: string;
  @IsEmail() email: string;
  @IsString() password: string;
  @IsString() country: string;
  @IsString() city: string;
  @IsString() locality: string;
  @IsString() address: string;
  @IsString() zip_code: string;
  @IsInt() role: number;
}
