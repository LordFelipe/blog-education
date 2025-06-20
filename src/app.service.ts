import { Injectable } from '@nestjs/common';
import { IsPublic } from './decorators/is-public';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
