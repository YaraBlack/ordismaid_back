import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DataPcService } from './app.service';
import { DataPcController, HealthController } from './app.controller';
import { HttpModule } from '@nestjs/axios'
import { ScheduleModule } from '@nestjs/schedule';


// @Module({
//   imports: [  ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),

  ],
  controllers: [DataPcController, HealthController],
  providers: [DataPcService],
})
export class StatusPcModule {}
