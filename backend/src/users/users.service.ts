import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'senha'>> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createUserDto.senha, salt);

      const createdUser = new this.userModel({
        ...createUserDto,
        senha: hash,
      });

      const resultado = await createdUser.save();
      const usuarioObj = resultado.toObject();

      const { senha, ...usuarioSemSenha } = usuarioObj as User;
      console.log(senha);

      return usuarioSemSenha;
    } catch (error: unknown) {
      const mongoError = error as { code?: number };
      if (mongoError.code === 11000) {
        throw new ConflictException('E-mail ou CPF já cadastrado! 🚫');
      }
      throw new InternalServerErrorException('Erro ao salvar no banco.');
    }
  }

  async listUsers(): Promise<User[]> {
    return this.userModel.find().select('-senha').exec();
  }

  async validarUsuario(
    email: string,
    senhaDigitada: string,
  ): Promise<UserDocument | null> {
    const usuario = await this.userModel.findOne({ email }).exec();

    if (usuario && usuario.senha) {
      const batem = await bcrypt.compare(senhaDigitada, usuario.senha);
      if (batem) return usuario;
    }
    return null;
  }

  async update(
    id: string,
    dados: Partial<CreateUserDto>,
  ): Promise<User | null> {
    const dadosParaAtualizar = { ...dados };

    if (dadosParaAtualizar.senha) {
      const salt = await bcrypt.genSalt(10);
      dadosParaAtualizar.senha = await bcrypt.hash(
        dadosParaAtualizar.senha,
        salt,
      );
    }

    const atualizado = await this.userModel
      .findByIdAndUpdate(id, dadosParaAtualizar, { new: true })
      .select('-senha')
      .exec();

    if (!atualizado) throw new NotFoundException('Usuário não encontrado.');
    return atualizado;
  }

  async remove(id: string): Promise<{ mensagem: string }> {
    const deletado = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletado) throw new NotFoundException('Usuário não encontrado.');
    return { mensagem: 'Removido com sucesso!' };
  }

  gerarToken(usuario: UserDocument) {
    const payload = { email: usuario.email, sub: usuario._id };

    return {
      access_token: this.jwtService.sign(payload),
      nome: usuario.nomeCompleto,
    };
  }
}
