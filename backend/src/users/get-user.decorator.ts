import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UsuarioPayload {
  id: string;
  email: string;
}

interface RequestComUsuario {
  user: UsuarioPayload;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsuarioPayload => {
    const request = ctx.switchToHttp().getRequest<RequestComUsuario>();

    return request.user;
  },
);
