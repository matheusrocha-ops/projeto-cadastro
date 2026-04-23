import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  nomeCompleto: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  senha: string;
  @Prop({ required: true })
  dataNascimento: string;
  @Prop({ required: true, unique: true })
  cpf: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
