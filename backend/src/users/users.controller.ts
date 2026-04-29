import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  // Criar Usuário
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Listar todos os usuários (O que faz a sua tabela funcionar)
  @Get()
  listUsers() {
    return this.usersService.listUsers();
  }

  // Atualizar Usuário
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dadosAtualizados: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, dadosAtualizados);
  }

  // Deletar Usuário
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Login Seguro
  @Post('login')
  @HttpCode(HttpStatus.OK) // Garante que o status de sucesso seja 200
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.usersService.validarUsuario(
      loginDto.email,
      loginDto.senha,
    );

    if (!usuario) {
      // Se não validar, lança um erro 401 que o Angular vai detectar no catch
      throw new UnauthorizedException('E-mail ou senha incorretos! ❌');
    }

    // Se der certo, retorna apenas os dados necessários
    return {
      id: usuario._id,
      nome: usuario.nomeCompleto,
      email: usuario.email,
    };
  }
}
