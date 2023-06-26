import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { EventEntity } from './event/event.entity';
import { User } from './user/user.entity';
import {TicketEntity} from "./ticket/ticket.entity";

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [User, EventEntity, TicketEntity],
  type: 'postgresql',
  dbName: configService.get('POSTGRES_DB'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
};

export default MikroOrmConfig;
