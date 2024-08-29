const { chromium } = require('playwright');

async function main() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
  
    // Intercept network requests
    await page.route('**/*', route => {
      const response = route.fetch();
      let body = response.text()
      console.log(body)
      route.continue();
    });
  
    await page.goto('https://example.com');
  
    const data = await page.$$eval('');
  
    await browser.close();
}

main()