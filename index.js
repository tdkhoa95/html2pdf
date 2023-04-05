const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
var fs = require('fs');

module.exports.html_to_pdf = async ({ templateHtml, dataBinding, options }) => {
  const template = handlebars.compile(templateHtml);
  const finalHtml = encodeURIComponent(template(dataBinding));

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--font-render-hinting=none'],
    headless: true,
    executablePath: '/usr/bin/google-chrome'
  });
  const page = await browser.newPage();
  await page.addStyleTag({
    content: `
    @font-face {
      font-family: 'DFKai-SB';
      src: url('usr/share/fonts/truetype/myfont/kaiu.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'PMingLiU';
      src: url('usr/share/fonts/truetype/myfont/PMingLiU.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  `
  });
  await page.setContent(templateHtml, {
    waitUntil: "networkidle0",
  });
  const buffer = await page.pdf(options);
  await browser.close();
  return buffer;
};
