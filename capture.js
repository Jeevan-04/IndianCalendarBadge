const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace 'http://localhost:5000' with the URL of your deployed app or local server
  await page.goto('http://localhost:5000');

  // Wait for the badge element to be rendered
  await page.waitForSelector('#badge');

  // Capture the screenshot of the badge element
  const badgeElement = await page.$('#badge');
  await badgeElement.screenshot({ path: 'badge.png' });

  await browser.close();
})();
