import { BrowserContext, chromium, Route } from 'playwright-chromium';

const LAUNCH_OPTIONS = {
  headless: true,
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--disable-extensions',
    '--disable-component-update',
  ],
};

async function dietNetwork(context: BrowserContext) {
  await context.route('**/*', (route: Route) => {
    const resourceType = route.request().resourceType();

    //불필요한 리소스 차단
    if (['image', 'stylesheet', 'font', 'media'].includes(resourceType))
      return route.abort();
    return route.continue();
  });
}

const url = 'https://live.ecomm-data.com/assignment';

export async function crawlLabangData() {
  const browser = await chromium.launch(LAUNCH_OPTIONS);

  try {
    const context = await browser.newContext();
    await dietNetwork(context);

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    const result = await page.evaluate(() => {
      const rows = document.querySelectorAll(
        'table.Table-module__fdc4Pa__table tbody tr',
      );

      return Array.from(rows).map((row) => {
        const tds = row.querySelectorAll('td');

        return {
          rank: tds[0]?.textContent?.trim() ?? '-',

          title: tds[1]?.querySelector('.title')?.textContent?.trim() ?? '-',

          platform:
            tds[1]
              ?.querySelector('.TableLabang-module__uW-g-G__adWrap')
              ?.childNodes[0]?.textContent?.trim() ?? '-',

          category: tds[2]?.querySelector('a')?.textContent?.trim() ?? '-',

          categoryHref: tds[2]?.querySelector('a')?.getAttribute('href') ?? '-',

          date: tds[3]?.querySelectorAll('span')[0]?.textContent?.trim() ?? '-',

          time: tds[3]?.querySelectorAll('span')[1]?.textContent?.trim() ?? '-',

          viewCount: tds[4]?.textContent?.trim() ?? '-',

          salesCount: tds[5]?.textContent?.trim() ?? '-',

          salesAmount: tds[6]?.textContent?.trim() ?? '-',

          itemCount: tds[7]?.textContent?.trim() ?? '-',

          href: tds[1]?.querySelector('a')?.getAttribute('href') ?? '-',
        };
      });
    });
    //console.log(result);

    return result;
  } catch (error) {
    console.error('크롤링 에러 발생: ', error);
    return [];
  } finally {
    //주석 처리하면 메모리 많이 먹음
    await browser.close();
  }
}

export async function crawlHomeShoppingData() {
  const browser = await chromium.launch(LAUNCH_OPTIONS);

  try {
    const context = await browser.newContext();
    await dietNetwork(context);

    const page = await context.newPage();

    await page.goto(url, {
      //networkidle보다 빠른 느낌
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // 홈쇼핑 탭 버튼 클릭
    await page.getByRole('button', { name: '홈쇼핑' }).click();

    /*
  // 홈쇼핑 테이블이 렌더링될 때까지 대기 (이걸로 안됨)
  await page
    .locator('table.Table-module__fdc4Pa__table tbody tr')
    .first()
    .waitFor();
  */

    // 홈쇼핑 테이블로 변경될 때 까지 대기
    await page.locator('.TableHsshow-module__aVdvXq__adWrap').first().waitFor();

    const result = await page.evaluate(() => {
      const rows = document.querySelectorAll(
        'table.Table-module__fdc4Pa__table tbody tr',
      );

      return Array.from(rows).map((row) => {
        const tds = row.querySelectorAll('td');

        return {
          rank: tds[0]?.textContent?.trim() ?? '-',

          title: tds[1]?.querySelector('a > span')?.textContent?.trim() ?? '-',

          platform:
            tds[1]
              ?.querySelector('.TableHsshow-module__aVdvXq__adWrap')
              ?.childNodes[0]?.textContent?.trim() ?? '-',

          category: tds[2]?.querySelector('a')?.textContent?.trim() ?? '-',

          categoryHref: tds[2]?.querySelector('a')?.getAttribute('href') ?? '-',

          date: tds[3]?.querySelectorAll('span')[0]?.textContent?.trim() ?? '-',

          time: tds[3]?.querySelectorAll('span')[1]?.textContent?.trim() ?? '-',

          // preparing이면 textContent가 ""이므로 alt를 사용
          viewRating:
            tds[4]?.querySelector('img')?.getAttribute('alt') ??
            tds[4]?.textContent?.trim() ??
            '-',

          salesCount: tds[5]?.textContent?.trim() ?? '-',

          salesAmount: tds[6]?.textContent?.trim() ?? '-',

          itemCount: tds[7]?.textContent?.trim() ?? '-',

          href: tds[1]?.querySelector('a')?.getAttribute('href') ?? '-',
        };
      });
    });

    //console.log(result);

    return result;
  } catch (error) {
    console.error('크롤링 에러 발생: ', error);
    return [];
  } finally {
    await browser.close();
  }
}