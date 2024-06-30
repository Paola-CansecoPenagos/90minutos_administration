import { CronJob } from 'cron';
import { UpdatePackageStatusService } from '../application/services/update_package_status';

const updateService = new UpdatePackageStatusService();

const job = new CronJob('*/10 * * * * *', function() {
  console.log('Running UpdatePackageStatusService...');
  updateService.updatePackageCounts();
}, null, true, 'America/New_York');

job.start();