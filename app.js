// const pdf = require("change-pdf");
// const path = require("path");
// pdf.compressPdf(path.join(__dirname + "/file.pdf"), "randop");
// console.log(__dirname);
var convertapi = require("convertapi")("7z6j8tHCbhTe2Va5");
convertapi
  .convert(
    "compress",
    {
      File: "de.pdf",
      ColorImageCompression: "jpx",
      RemoveBookmarks: "true",
      RemoveAnnotations: "true",
      RemovePageLabels: "true",
      RemoveLayers: "true",
      RemoveArticleThreads: "true",
      Linearize: "true",
    },
    "pdf"
  )
  .then(function (result) {
    result.saveFiles(__dirname + "/pdfs");
  });
