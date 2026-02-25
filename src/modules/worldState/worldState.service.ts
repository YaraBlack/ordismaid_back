import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { promises as fs } from 'fs';
import path from 'path';

@Injectable()
export class WorldStateService implements OnModuleInit {
  private cachedData: any = null;

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    const storageDir = path.join(process.cwd(), 'storage');

    try {
      const files = await fs.readdir(storageDir);
      const cacheFiles = files
        .filter(
          (file) => file.startsWith('cachedData_') && file.endsWith('.json'),
        )
        .sort()
        .reverse();

      if (cacheFiles.length > 0) {
        const newestFile = path.join(storageDir, cacheFiles[0]);
        const data = await fs.readFile(newestFile, 'utf8');
        this.cachedData = JSON.parse(data);
        console.log(`Loaded latest cache: ${cacheFiles[0]}`);
      } else {
        const templateData = await fs.readFile(
          './src/template/warframestat.json',
          'utf8',
        );
        this.cachedData = JSON.parse(templateData);
        console.log(`Loaded a template file`);
      }
    } catch (error) {
      console.error('Initial data load failed:', error.message);
    }

    this.fetchStatus().catch((err) =>
      console.error('Initial background fetch failed'),
    );

    console.log('App is ready to serve cached data while API fetches...');
  }

  @Cron('0 */2 * * * *')
  async fetchStatus() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.warframestat.us/pc', {
          timeout: 120000,
        }),
      );

      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const fileName = `cachedData_${timestamp}.json`;
      const filePath = path.join(process.cwd(), 'storage', fileName);

      this.cachedData = data;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`File ${fileName} written successfully`);
      console.log('Variable updated with fresh data');
    } catch (e) {
      console.error('Fetch failed, keeping old data');
    }
  }

  getData() {
    return this.cachedData;
  }
}
