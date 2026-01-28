import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class DataPcService implements OnModuleInit{
  private cachedData: any = null;

  constructor (private readonly httpService: HttpService) {}

  async onModuleInit() {
    await this.fetchStatus();
  }

  @Cron('0 */2 * * * *')
  async fetchStatus() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get("https://api.warframestat.us/pc")
      )
      this.cachedData = data;
      console.log('Variable updated with fresh data');
    } catch(e) {
      console.error('Fetch failed, keeping old data');
    }
  }

  getData() {
    return this.cachedData
  }
}