import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

export class QueueProcessor {
  private connection: IORedis;

  constructor() {
    const host = process.env.REDIS_HOST || '127.0.0.1';
    const port = parseInt(process.env.REDIS_PORT || '6379', 10);

    this.connection = new IORedis({ host, port });
    
    
    new Worker(
      'jobs',
      async (job: Job) => {
        switch (job.name) {
          case 'sendEmail':
            console.log(
              'Sending email for order:',
              job.data.orderId,
              'payment:',
              job.data.paymentId,
            );
            
            break;
          default:
            console.log('Unknown job:', job.name);
        }
      },
      {
        connection: this.connection,
      },
    );
  }
}