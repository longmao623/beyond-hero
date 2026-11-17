const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const filePath = path.resolve('dist/single-file.html');
  const fileUrl = 'file://' + filePath;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const rootHtml = await page.$eval('#root', el => el.innerHTML.length);
  console.log('root innerHTML length:', rootHtml);

  await page.screenshot({ path: 'screenshot-file-open.png', fullPage: true });
  console.log('saved screenshot-file-open.png');

  await browser.close();
})();
