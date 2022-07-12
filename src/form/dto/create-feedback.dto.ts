import { IsEmail, IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(2, 100)
  readonly name: string;

  @IsString()
  @IsEmail({}, { message: 'Email is not correct' })
  readonly email: string;

  @IsString()
  @Length(2, 200)
  readonly message: string;
}
