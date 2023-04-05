const fs = require("fs");
const path = require("path");
const { html_to_pdf } = require(".");
const express = require('express');
const app = express();

app.listen(3000, () => console.log('Example app is listening on port 3000.'));

app.get('/api/html2pdf', (req, res) => {
  try {
    (async () => {
      const dataBinding = {
        items: [
          {
            name: "item 1",
            price: 100,
          },
          {
            name: "item 2",
            price: 200,
          },
          {
            name: "item 3",
            price: 300,
          },
        ],
        total: 600,
        isWatermark: true,
      };

      const templateHtml = fs.readFileSync(
        path.join(process.cwd(), "test_stemp.html"),
        "utf8"
      );

      const options = {
        format: 'A4',
        // headerTemplate: "<p></p>",
        // footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
          top: "5px",
          bottom: "5px",
          left: "5px",
          right: "5px"
        },
        fullPage: true,
        landscape: false
        // printBackground: true,
        // path: 'template.pdf',
      };
      console.log("templateHTMl", templateHtml);

      const buffer = await html_to_pdf({ templateHtml, dataBinding, options });

      console.log("Done: template.pdf is created!");

      res.set('Content-Type', 'application/pdf');
      res.send(buffer);

      // fs.readFile(options.path, function (err, data) {
      //   // res.contentType("image/png");
      //   res.contentType("application/pdf");
      //   res.send(data);
      // });
    })();
  } catch (err) {
    console.log("ERROR:", err);
  }
});


app.get('/api/html2pdf-envelope', (req, res) => {
  try {
    (async () => {
      const dataBinding = {
        items: [
          {
            name: "item 1",
            price: 100,
          },
          {
            name: "item 2",
            price: 200,
          },
          {
            name: "item 3",
            price: 300,
          },
        ],
        total: 600,
        isWatermark: true,
      };

      const templateHtml = fs.readFileSync(
        path.join(process.cwd(), "template.html"),
        "utf8"
      );

      const options = {
        format: 'A4',
        // headerTemplate: "<p></p>",
        // footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
          top: "5px",
          bottom: "5px",
          left: "5px",
          right: "5px"
        },
        fullPage: true,
        landscape: false
        // printBackground: true,
        // path: 'template.pdf',
      };
      console.log("templateHTMl", templateHtml);

      const buffer = await html_to_pdf({ templateHtml, dataBinding, options });

      console.log("Done: template.pdf is created!");

      res.set('Content-Type', 'application/pdf');
      res.send(buffer);

      // fs.readFile(options.path, function (err, data) {
      //   // res.contentType("image/png");
      //   res.contentType("application/pdf");
      //   res.send(data);
      // });
    })();
  } catch (err) {
    console.log("ERROR:", err);
  }
});


