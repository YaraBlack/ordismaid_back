import { Module } from '@nestjs/common';
import { WorldStateModule } from './modules/worldState/worldState.module';

@Module({
  imports: [WorldStateModule],
})
export class AppModule {}
