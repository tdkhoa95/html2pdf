const puppeteer = require("puppeteer");

exports.convert = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--single-process",
                "--disable-gpu",
                "--font-render-hinting=none",
            ],
            headless: true,
            executablePath: "/usr/bin/google-chrome",
        });
        const options = {
            format: "A4",
            displayHeaderFooter: false,
            margin: {
                top: "5px",
                bottom: "5px",
                left: "5px",
                right: "5px",
            },
            fullPage: true,
            landscape: false,
            printBackground: true,
        };

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
            `,
        });
        console.log("body.template", req.body.template);
        await page.setContent(req.body.template, { waitUntil: "domcontentloaded" });
        const buffer = await page.pdf(options);
        await browser.close();

        res.set("Content-Type", "application/pdf");
        res.send(buffer);

        return res;
    } catch (error) {
        console.log(error);
        next(error);
    }
};
