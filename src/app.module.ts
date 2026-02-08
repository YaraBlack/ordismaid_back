import { Module } from '@nestjs/common';
import { DataPcService } from './app.service';
import { DataPcController, HealthController } from './app.controller';
import { HttpModule } from '@nestjs/axios'
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),

  ],
  controllers: [DataPcController, HealthController],
  providers: [DataPcService],
})
export class StatusPcModule {}
