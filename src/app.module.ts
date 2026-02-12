import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SubmitFromModule } from './submitfrom/submitfrom.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');
        if (!mongoUri) {
          throw new Error(' MONGO_URI missing in .env');
        }
        return { uri: mongoUri };
      },
    }),

    SubmitFromModule,
  ],
})
export class AppModule {}
