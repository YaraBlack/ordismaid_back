import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(200)
  getHealth() {
    return {
      statusCode: 200,
      message: 'Data retrieved successfully.',
      data: { system: 'active' },
    };
  }
}
