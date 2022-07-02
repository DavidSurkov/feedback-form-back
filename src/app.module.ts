import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, //Disable before prod
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}