const puppeteer = require('puppeteer');

// Function to introduce a delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Clearing cache and cookies...');
    await page.deleteCookie(...await page.cookies());
    await page.setCacheEnabled(false);

    console.log('Setting viewport...');
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2,
    });

    console.log('Navigating to the page...');
    const currentTimestamp = new Date().getTime();
    await page.goto(`https://vikramsamvat.onrender.com?cache_bust=${currentTimestamp}`, {
      waitUntil: 'networkidle0',
      timeout: 120000,
    });

    console.log('Waiting for content to update...');
    await wait(5000); // Wait for 5 seconds to allow dynamic content to update

    console.log('Waiting for #badge element...');
    await page.waitForSelector('#badge', { timeout: 120000 });

    console.log('Capturing screenshot...');
    const badgeElement = await page.$('#badge');
    if (badgeElement) {
      await badgeElement.screenshot({ path: 'badge.png' });
      console.log('Screenshot saved as badge.png');
    } else {
      console.error('Element with selector #badge not found');
    }

    console.log('Closing browser...');
    await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
