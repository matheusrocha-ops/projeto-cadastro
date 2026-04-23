import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsISO8601,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
  nomeCompleto: string;

  @IsEmail({}, { message: 'O email informado é inválido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @MaxLength(16, { message: 'A senha deve ter no mínimo 16 caracteres.' })
  @Matches(/((?=.*\d))(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter letras maiúsculas, minúsculas e números.',
  })
  senha: string;
}
