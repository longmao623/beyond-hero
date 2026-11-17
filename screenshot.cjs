const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  const takeShot = async (name, width, height) => {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `screenshot-${name}.png`, fullPage: true });
    console.log(`saved screenshot-${name}.png`);
    await page.close();
  };

  await takeShot('desktop', 1440, 900);
  await takeShot('mobile', 375, 812);

  await browser.close();
})();
