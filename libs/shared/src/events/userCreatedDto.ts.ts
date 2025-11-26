import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, IsUUID } from "class-validator";

export class UserCreatedEventDto {
  @IsUUID()
  userId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}

