import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
/// I don't know...
import { CronJob } from '@nestjs/schedule/node_modules/cron';

@Injectable()
export class TokenRefreshService {
  constructor(private readonly scheduler: SchedulerRegistry) {}

  startRefresh(refreshFunc: () => void) {
    const job = new CronJob('* 56 * * * *', () => {
      refreshFunc();
      console.log('Quickbooks token has been refreshed.');
    });

    this.scheduler.addCronJob('refresh-token', job);
    job.start();
  }

  stopRefresh() {
    this.scheduler.deleteCronJob('refresh-token');
  }
}
