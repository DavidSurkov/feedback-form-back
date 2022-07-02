import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly message: string;
}
