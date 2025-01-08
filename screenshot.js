const puppeteer = require('puppeteer');

// Function to introduce a delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Setting user-agent...');
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    console.log('Disabling cache...');
    await page.setCacheEnabled(false);

    console.log('Setting viewport...');
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    });

    console.log('Navigating to the page...');
    const timestamp = Date.now(); // Add timestamp to bypass cache
    await page.goto(`https://vikramsamvat.onrender.com?cache_bust=${timestamp}`, {
      waitUntil: 'networkidle2',
      timeout: 120000,
    });

    console.log('Waiting for dynamic content...');
    await page.waitForSelector('#badge', { timeout: 120000 }); // Ensure the badge element is loaded

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
