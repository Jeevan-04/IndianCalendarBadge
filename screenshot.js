const puppeteer = require('puppeteer');

// Function to introduce a delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main function to capture a screenshot
(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Disabling cache...');
    await page.setCacheEnabled(false);

    console.log('Setting viewport...');
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    });

    console.log('Navigating to the page...');
    await page.goto('https://vikramsamvat.onrender.com', {
      waitUntil: 'networkidle2',
      timeout: 120000
    });

    console.log('Page URL:', page.url());

    // Capture full-page screenshot
    const fullPagePath = 'fullpage.png';
    console.log(`Capturing full-page screenshot and saving as ${fullPagePath}...`);
    await page.screenshot({ path: fullPagePath, fullPage: true });
    console.log(`Full-page screenshot saved as ${fullPagePath}`);

    // Delay to ensure elements load dynamically
    console.log('Waiting for dynamic elements...');
    await wait(2000);

    // Check for #badge element
    const badgeSelector = '#badge';
    console.log(`Waiting for element ${badgeSelector}...`);
    await page.waitForSelector(badgeSelector, { timeout: 120000 });

    console.log('Capturing screenshot of #badge...');
    const badgeElement = await page.$(badgeSelector);
    const badgeScreenshotPath = 'badge.png';

    if (badgeElement) {
      await badgeElement.screenshot({ path: badgeScreenshotPath });
      console.log(`Screenshot of #badge saved as ${badgeScreenshotPath}`);
    } else {
      console.error(`Element with selector ${badgeSelector} not found`);
    }

    console.log('Closing browser...');
    await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
