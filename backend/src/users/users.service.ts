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

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 1. CRIAR USUÁRIO
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

      // Removemos a senha de forma segura para o TypeScript
      const { senha, ...usuarioSemSenha } = usuarioObj as User;
      console.log(senha); // Apenas para o linter não reclamar de variável não usada

      return usuarioSemSenha;
    } catch (error: unknown) {
      // Tratamento de erro sem usar 'any'
      const mongoError = error as { code?: number };
      if (mongoError.code === 11000) {
        throw new ConflictException('E-mail ou CPF já cadastrado! 🚫');
      }
      throw new InternalServerErrorException('Erro ao salvar no banco.');
    }
  }

  // 2. LISTAR USUÁRIOS
  async listUsers(): Promise<User[]> {
    return this.userModel.find().select('-senha').exec();
  }

  // 3. VALIDAR USUÁRIO (LOGIN)
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

  // 4. ATUALIZAR
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

  // 5. REMOVER
  async remove(id: string): Promise<{ mensagem: string }> {
    const deletado = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletado) throw new NotFoundException('Usuário não encontrado.');
    return { mensagem: 'Removido com sucesso!' };
  }
}
