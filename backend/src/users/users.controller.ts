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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser, type UsuarioPayload } from './get-user.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listarUsuarios(@GetUser() _usuarioLogado: UsuarioPayload) {
    return this.usersService.listUsers();
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
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.usersService.validarUsuario(
      loginDto.email,
      loginDto.senha,
    );

    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha incorretos! ❌');
    }

    return this.usersService.gerarToken(usuario);
  }
}
