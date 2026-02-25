import { Module } from '@nestjs/common';
import { WorldStateModule } from './modules/worldState/worldState.module';
import { HealthController } from './app.controller';

@Module({
  imports: [WorldStateModule],
  controllers: [HealthController],
})
export class AppModule {}
