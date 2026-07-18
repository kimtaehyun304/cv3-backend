import cron from 'node-cron';

import { setHomeShoppingCache, setLabangCache } from './common/cache';
import {
  crawlHomeShoppingData,
  crawlLabangData,
} from './services/crawlService';

export async function startScheduler() {
  await cacheCrawledBroadcast();

  cron.schedule('*/1 * * * *', async () => {
    try {
      await cacheCrawledBroadcast();
    } catch (err) {
      console.error(err);
    }
  });
}

async function cacheCrawledBroadcast() {
  //속도를 위해 병렬 진행
  const [labang, homeShopping] = await Promise.all([
    crawlLabangData(),
    crawlHomeShoppingData(),
  ]);

  setLabangCache(labang);
  setHomeShoppingCache(homeShopping);
}
