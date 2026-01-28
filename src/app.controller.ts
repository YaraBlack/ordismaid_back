import { Controller, Get, HttpCode } from '@nestjs/common';
import { DataPcService } from './app.service';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

@Controller()
export class DataPcController {
  constructor(private readonly dataPcService: DataPcService) {}

  @Get('pc')
  async getStatus() {
    const data = await this.dataPcService.getData();
    return data || {message: "No data cached yet"};

  }
}

@Controller()
export class HealthController {

  @Get('health')
  @HttpCode(200)
  getHealth() {
    return {
      statusCode: 200,
      message: 'Data retrieved successfully.',
      data: { system: 'active' }
    };
  }
}
