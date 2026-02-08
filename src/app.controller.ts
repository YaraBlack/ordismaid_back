import { Controller, Get, HttpCode } from '@nestjs/common';
import { DataPcService } from './app.service';
import { UseInterceptors } from '@nestjs/common';
import { TransformDataAPIRequestInterceptor } from './interceptors/normalizeResponse';

@Controller('pc')
export class DataPcController {
  constructor(private readonly dataPcService: DataPcService) {}
  
  @UseInterceptors(TransformDataAPIRequestInterceptor)
  @Get()
  async getStatus() {
    const data = await this.dataPcService.getData();
    return data || {message: "No data cached yet"};

  }
}

@Controller('health')
export class HealthController {

  @Get()
  @HttpCode(200)
  getHealth() {
    return {
      statusCode: 200,
      message: 'Data retrieved successfully.',
      data: { system: 'active' }
    };
  }
}
