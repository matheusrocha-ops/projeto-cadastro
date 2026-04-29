import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nomeCompleto?: string;

  @IsEmail({}, { message: 'O email informado é inválido.' })
  @IsOptional()
  email?: string;

  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @MaxLength(16, { message: 'A senha deve ter no máximo 16 caracteres.' })
  @Matches(/((?=.*\d))(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter letras maiúsculas, minúsculas e números.',
  })
  @IsOptional()
  senha?: string;
}
