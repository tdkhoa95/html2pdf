const pdfService = require("../services/pdfService");
const wordService = require("../services/wordService");

// Check server health.
exports.healthz = async (req, res, next) => {
    return res.send(200);
};

// Convert single HTML to a pdf/word file.
exports.convert = async (req, res, next) => {
    if (req.body.isWord) {
        var buffer = await wordService.convert(req.body.template);

        res.set(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.send(buffer);
    } else {
        var buffer = await pdfService.convert(req.body.template);

        res.set("Content-Type", "application/pdf");
        res.send(buffer);
    }

    return res;
};

// Convert multiple HTML contents to pdf files in a zip.
exports.convertMultiple = async (req, res, next) => {
    var buffer = await pdfService.convertMultiple(req.body.templates);

    res.set("Content-Length", buffer.size);
    res.send(Uint8Array.from(buffer));

    return res;
};
