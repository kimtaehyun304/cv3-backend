import { chromium } from 'playwright';

//카테고리 데이터가 react 렌더링 이후 채워지는거라 cheerio 방식의 크롤리을론 불가
/*
export async function crawlData() {
  const url = 'https://live.ecomm-data.com/assignment';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const result: any = [];

  $('table.Table-module__fdc4Pa__table tbody tr').each((_, tr) => {
    const tds = $(tr).find('td');
    //console.log($(tds[2]).html());
    result.push({
      rank: $(tds[0]).text().trim(),
      title: $(tds[1]).find('.title').text().trim(),
      platform: $(tds[1])
        .find('.TableLabang-module__uW-g-G__adWrap')
        .contents()
        .first()
        .text()
        .trim(),
      category: $(tds[2]).find('a').text().trim(),
      date: $(tds[3]).find('span').eq(0).text().trim(),
      time: $(tds[3]).find('span').eq(1).text().trim(),
      viewCount: $(tds[4]).text().trim(),
      salesCount: $(tds[5]).text().trim(),
      salesAmount: $(tds[6]).clone().children().remove().end().text().trim(),
      itemCount: $(tds[7]).text().trim(),
      href: $(tds[1]).find('a').attr('href'),
    });
  });

  console.log(result);
}
*/

export async function crawlLabangData() {
  const url = 'https://live.ecomm-data.com/assignment';

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle',
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

  //await browser.close();

  console.log(result);

  return result;
}

export async function crawlHomeShoppingData() {
  const url = 'https://live.ecomm-data.com/assignment';

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    //networkidle보다 빠른 느낌
    waitUntil: 'domcontentloaded',
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

  await browser.close();

  console.log(result);

  return result;
}
