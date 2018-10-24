const puppeteer = require("puppeteer");
const path = require("path");

export function getScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.screenshot({ path: path(__dirname, "/results/test.png") });
  
    await browser.close();  
}

/*
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.screenshot({ path: path(__dirname, "/results/test.png") });

  await browser.close();
})();
*/