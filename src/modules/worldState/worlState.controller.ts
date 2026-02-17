import { Controller, Get, HttpCode } from '@nestjs/common';
import { WorldStateService } from './worldState.service';
import { UseInterceptors } from '@nestjs/common';
import { TransformDataAPIRequestInterceptor } from '../../interceptors/normalizeResponse';

@Controller('worldState')
export class WorldStateController {
  constructor(private readonly worldStateService: WorldStateService) {}

  @UseInterceptors(TransformDataAPIRequestInterceptor)
  @Get()
  async getStatus() {
    const data = await this.worldStateService.getData();
    return data || { message: 'No data cached yet' };
  }
}
