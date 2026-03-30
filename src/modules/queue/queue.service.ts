import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

@Injectable()
export class QueueService {
  private connection: IORedis;
  private queue: Queue;

  constructor() {
    const host = process.env.REDIS_HOST || '127.0.0.1';
    const port = parseInt(process.env.REDIS_PORT || '6379', 10);

    this.connection = new IORedis({ host, port });

    this.queue = new Queue('jobs', {
      connection: this.connection,
    });
  }

  /**
   * Add a job to the queue
   * @param name job name
   * @param data job payload
   * @param attempts retry attempts (default 3)
   */
  async addJob(name: string, data: any, attempts = 3) {
    await this.queue.add(name, data, { attempts });
  }
}