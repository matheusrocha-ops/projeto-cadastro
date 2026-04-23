import {Injectable} from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@Injectable(UsersService.name), private userModel: Model<User>) {}

    
    async createInflateRaw(dados: any): Promise<User> {
        const novoUsuario = new this.userModel(dados);
        return novoUsuario.save();
    }
    
}
