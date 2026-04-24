import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dadosAtualizados: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, dadosAtualizados);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.usersService.validarUsuario(
      loginDto.email,
      loginDto.senha,
    );

    if (!usuario) {
      return { mensagem: 'E-mail ou senha incorretos! ❌' };
    }

    return {
      mensagem: 'Login realizado com sucesso! ✅',
      usuario: {
        nome: usuario.nomeCompleto,
        email: usuario.email,
      },
    };
  }
}
