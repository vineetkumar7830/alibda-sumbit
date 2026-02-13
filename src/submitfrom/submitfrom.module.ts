import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubmitFromService } from './submitfrom.service';
import { SubmitFromController } from './submitfrom.controller';
import { SubmitFrom, SubmitFromSchema } from './entities/submitfrom.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmitFrom.name, schema: SubmitFromSchema },
    ]),
  ],
  controllers: [SubmitFromController],
  providers: [SubmitFromService],
})
export class SubmitFromModule {}
