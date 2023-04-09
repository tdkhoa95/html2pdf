const htmlToDoc = require("html-to-docx");

exports.convert = async (html) => {
    try {
        const header = `<style>
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
        </style>`
        const options = {
            margin: {
                top: "5px",
                bottom: "5px",
                left: "5px",
                right: "5px",
            },
            orientation: "portrait"
        };

        const buffer = await htmlToDoc(html, header, options, null);

        return buffer;
    } catch (error) {
        console.log(error);
    }
}