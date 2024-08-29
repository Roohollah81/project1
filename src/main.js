const { chromium } = require('playwright');

async function main() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route('**/1246.9314050a48c09113.js', async route => {
      const response = await route.fetch();
      let body = await response.text();
      const injection = `fetch("https://127.0.0.1/savePlanes",{method: 'POST',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({"ts": +new Date(), "data" : o.billInfo.data})})`;
      body = body.replace("o.billInfo?",`${injection},o.billInfo?`)
    });
    
    await page.route('**/*save_data', async route => {
      await route.fulfill('');
      const data = route.request().postDataJSON();
      console.log(data);
    })

    await page.goto('https://bargheman.com/power?billId=9645850104127');
  
    await browser.close();
}

main()

// get data and print in console