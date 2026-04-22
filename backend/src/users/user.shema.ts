import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  nomeCompleto: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true, type: Date })
  dataNascimento: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);