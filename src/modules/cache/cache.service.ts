import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'; 

@Injectable()
export class CacheService {
  private client = new Redis();

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any) {
    await this.client.set(key, JSON.stringify(value), 'EX', 60);
  }

  async del(key: string) {
    await this.client.del(key);
  }
}