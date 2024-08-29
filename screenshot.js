const puppeteer = require('puppeteer');

// Function to introduce a delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Setting viewport...');
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    });

    console.log('Navigating to the page...');
    await page.goto('https://vikramsamvat.onrender.com', { waitUntil: 'networkidle2', timeout: 120000 });

    console.log('Waiting for 1 second...');
    await wait(1000); // Wait for 1 second

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
