import { Injectable } from '@nestjs/common';
import { UserService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private userServices: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
