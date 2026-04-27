import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dadosAtualizados: Partial<CreateUserDto>,
  ) {
    return await this.usersService.update(id, dadosAtualizados);
  }

  @Get()
  async listUsers() {
    return await this.usersService.listUsers();
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
