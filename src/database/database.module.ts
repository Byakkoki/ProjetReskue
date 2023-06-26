import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { EventEntity } from '../event/event.entity';
import {TicketEntity} from "../ticket/ticket.entity";
 
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbName: configService.get('POSTGRES_DB'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        type: 'postgresql',
        entities: [
            User,
            EventEntity,
            TicketEntity
        ],
      }),
    }),
  ],
})
export class DatabaseModule {}