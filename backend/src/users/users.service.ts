import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async update(id: string, dadosAtualizados: Partial<CreateUserDto>) {
    return await this.userModel
      .findByIdAndUpdate(id, dadosAtualizados, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async validarUsuario(email: string, senhaDigitada: string) {
    const usuario = await this.userModel.findOne({ email }).exec();
    if (usuario && usuario.senha === senhaDigitada) {
      return usuario;
    }
    return null;
  }

  async listUsers() {
    return await 0;
  }
}
