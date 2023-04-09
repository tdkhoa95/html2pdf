const puppeteer = require("puppeteer");
const jszip = require("jszip");


// Convert single HTML contet to a pdf file.
exports.convert = async (html) => {
    try {
        var [page, browser] = await getGenerator();

        await page.setContent(html, {
            waitUntil: "networkidle0",
        });
        var buffer = await page.pdf(options);
        await browser.close();

        return buffer;
    } catch (error) {
        console.log(error);
    }
};

// Convert multiple HTML contents to pdf files and zip it.
exports.convertMultiple = async (htmlList) => {
    try {
        var [page, browser] = await getGenerator();

        var zip = new jszip();
        var titleRegex = `(?<=<title>)(.*?)(?=</title>)`;
        for (let i = 0; i < htmlList.length; i++) {
            var html = htmlList[i];
            await page.setContent(html, {
                waitUntil: "networkidle0",
            });
            var buffer = await page.pdf(options);

            zip.file(html.match(titleRegex)[0] + ".pdf", buffer, {
                binary: true,
            });
        }
        var buffer = await zip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        await browser.close();

        return buffer;
    } catch (error) {
        console.log(error);
    }
};

// Configuration for exported pdf pages.
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

// Get configurated generator to create pdf.
async function getGenerator() {
    var browser = await puppeteer.launch({
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

    var page = await browser.newPage();
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
            @font-face {
                font-family: 'ralewayregular';
                src: url('usr/share/fonts/truetype/myfont/Raleway-Regular.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'calibri';
                src: url('usr/share/fonts/truetype/myfont/calibri.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
        `,
    });

    return [page, browser];
}
