import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { WorldStateController } from './worlState.controller';
import { WorldStateService } from './worldState.service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [WorldStateController],
  providers: [WorldStateService],
  exports: [WorldStateService],
})
export class WorldStateModule {}
