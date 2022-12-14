// const CloudConvert = require("cloudconvert");
// const fs = require("fs");
// const https = require("https");
// const cloudConvert = new CloudConvert(
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTA2ZGMwMmUxMTRmNzY3ZGE4MDdkODJkMGU1MjlhZDNlMmNlYmE4NjQ3YmUzMDQ5OTRjMmQwNWJmMjMwZjJiYTc1Y2NhM2UzNjljM2I3NzkiLCJpYXQiOjE2NzEwMDUwMzcuMjMzNjk4LCJuYmYiOjE2NzEwMDUwMzcuMjMzNjk5LCJleHAiOjQ4MjY2Nzg2MzcuMjI5NzY5LCJzdWIiOiI2MTI5ODg0NiIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.XGAHYh-l-7eDWl2S4KO6dRpF8R3AshFbyBpUNTMzQ50twTYLSBRD0SaTB80T9ILaCxKTakW_k-Q-cEp98NWVIUHcmcDeZyY_dzNZK4TpaD0R-WBZpy5zG6jc4qZMMoocraLAv1STtwzWJ7jP_mu-u3r0eZVhRit_EWR0ZgvMpUdXP54A54XOa9aw29jMJS5nCu6T9cUuf40ijhjtjE0cFgjcY5ie4mlcq8jSN6aeG31BAMGtnU0cSa8Tq17uWCwrtKgL-E1jN__YfQjfJ36n_HIvf38Ph8i8HJ5qvF77B2XfQ547QutFu67aFGtY8W_LCBntpzhQIIlrq2cV94x4G9TTdrhn8dad65GQYWmyq0FWjJ66_YJDpdNNy_yNqeHizyHMs93QacQz9aTOKcSqk7N22JmjACnYeIP36KhtB1HaLNCyDYlpQkjnpo7RzC_0Cg6yya6SShULmi5SKQzIueRSNGY0O3xGcmLAQv-FC9y5WYuTxoUHheWU4Sim9yQHjOlLonNO2wrnZ1KmyfuiYXIbaHIJrgtadFfjU2Fw38d3IldzhTKcqsj4I5edz4LXNm0Xi7g63T8w2_6VrNdnUnCyofbCvmWuOUBPGcKRqsQcFqCuNDsWatNgmxIMERSt6hcjZoZXTQZp3CdZG-9KEaUGvdCYg4KCEH2uQOuhoHo"
// );
// const file = async () => {
//   try {
//     let job = await cloudConvert.jobs.create({
//       tasks: {
//         "import-my-file": {
//           operation: "import/url",
//           url: "https://firebasestorage.googleapis.com/v0/b/filecompresoor.appspot.com/o/Tree.pdf?alt=media&token=add03c32-7b5c-44ec-b054-66d9ec41f605",
//           engine: "3heights",
//           profile: "web",
//           flatten_signatures: false,
//         },
//         "convert-my-file": {
//           operation: "convert",
//           input: "import-my-file",
//           output_format: "pdf",
//           some_other_option: "value",
//           engine: "3heights",
//           profile: "web",
//           flatten_signatures: false,
//         },
//         "export-my-file": {
//           operation: "export/url",
//           input: "convert-my-file",
//           engine: "3heights",
//           profile: "web",
//           flatten_signatures: false,
//         },
//       },
//     });
//     job = await cloudConvert.jobs.wait(job.id); // Wait for job completion

//     const file = cloudConvert.jobs.getExportUrls(job)[0];

//     const writeStream = fs.createWriteStream("./out/" + "oye");

//     https.get(file.url, function (response) {
//       response.pipe(writeStream);
//     });

//     await new Promise((resolve, reject) => {
//       writeStream.on("finish", resolve);
//       writeStream.on("error", reject);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
// file();
// const sharp = require("sharp");
// const fs = require("fs");

// sharp("file.pdf")
//   .resize(200, 200)
//   .toFile("dk.pdf", (err, info) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`PDF file compressed successfully: ${info}`);
//     }
//   });
// Load the PDF file
// PDFJS.getDocument('de.pdf').then(function(pdf) {
// Get the first page
//   pdf.getPage(1).then(function(page) {
//     // Set the scale of the page (e.g. to half its size)
//     var scale = 0.5;
//     var viewport = page.getViewport(scale);

//     // Set the desired dimensions of the output file
//     var outputWidth = 100;
//     var outputHeight = 100;

//     // Create a canvas to render the page onto
//     var canvas = document.createElement('canvas');
//     var context = canvas.getContext('2d');
//     canvas.height = outputHeight;
//     canvas.width = outputWidth;

//     // Render the page onto the canvas
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     };
//     page.render(renderContext).then(function() {
//       // Get the canvas contents as a data URL
//       var dataURL = canvas.toDataURL();

//       // Use the data URL to create a new PDF file
//       var pdf = new jsPDF('p', 'pt', [outputWidth, outputHeight]);
//       pdf.addImage(dataURL, 'PNG', 0, 0);

//       // Save the PDF to file
//       pdf.save('compressed.pdf');
//     });
//   });
// });
// const compressPdf = require("compress-pdf");

// // path to the PDF file that you want to compress
// const filePath = __dirname + "/de.pdf";

// // compress the PDF file
// compressPdf(filePath, {
//   // set the level of compression (0-9)
//   // 0 = no compression, 9 = maximum compression
//   compressionLevel: 9,
// }).then((result) => {
//   // result contains the path to the compressed PDF file
//   console.log(result);
// });
// const fs = require("fs");
// const PDFLib = require("pdf-lib");

// async function main() {
//   // Open the PDF file
//   const pdfBytes = fs.readFileSync("de.pdf");
//   const pdf = await PDFLib.PDFDocument.load(pdfBytes);

//   // Compress the PDF
//   pdf.compress();

//   // Save the compressed PDF to a new file
//   const pdfByte = await pdf.save();
//   fs.writeFileSync("output.pdf", pdfByte);
// }

// main();
// const fs = require("fs");
// const pdftk = require("node-pdftk");

// async function main() {
//   // Compress the PDF
//   const input = fs.createReadStream("de.pdf");
//   const output = fs.createWriteStream("output.pdf");
//   await pdftk.compress(input, output);
// }

// main();
const fs = require("fs");
// const PDFLib = require("pdf-lib");

// async function main() {
//   // Open the PDF file
//   const pdfBytes = fs.readFileSync("de.pdf");
//   const pdf = await PDFLib.load(pdfBytes);

//   // Get the first page of the PDF
//   const page = pdf.getPages()[0];

//   // Render the page to a PNG image
//   const pngBytes = await page.render({ format: "png" });

//   // Save the PNG image to a file is okay to do so Chat GPT is the worst it never gives the correct solution to me never ever
//   fs.writeFileSync("output.png", pngBytes);
// }

// main();
// const { PDFDocumentFactory, PDFDocumentWriter } = require("pdf-lib");

// // Open the PDF file
// const pdfBytes = fs.readFileSync("de.pdf");
// const pdfDoc = PDFDocumentFactory.load(pdfBytes);

// // Compress the PDF file
// pdfDoc.compress();

// // Save the PDF file
// const pdfByte = PDFDocumentWriter.saveToBytes(pdfDoc);
// fs.writeFileSync("my-file-compressed.pdf", pdfByte);
// Load the PDF.js library
// var pdfjsLib = require("pdfjs-dist");

// // Load the PDF file
// pdfjsLib.getDocument("de.pdf").then(function (pdf) {
//   // Get the first page of the PDF
//   var page = pdf.getPage(1);

//   // Set the compression level to high
//   var scale = 0.5;
//   var viewport = page.getViewport({ scale: scale });

//   // Render the page to a canvas
//   var canvas = document.getElementById("the-canvas");
//   var context = canvas.getContext("2d");
//   page.render({ canvasContext: context, viewport: viewport });

//   // Get the data URL of the canvas
//   var dataURL = canvas.toDataURL("image/jpeg", 1.0);

//   // Use the data URL to create a new PDF with the same content but lower quality
//   var doc = new jsPDF("landscape", undefined, "a4");
//   doc.addImage(dataURL, "JPEG", 0, 0, 297, 210);

//   // Save the new PDF
//   doc.save("compressed.pdf");
// });
// Load the jsPDF library
// var jsPDF = require("jspdf");

// // Load the PDF file
// var pdf = jsPDF("landscape", undefined, "a4");
// pdf.addFileToVFS("js.pdf");
// pdf.addImage("js.pdf", "PDF", 0, 0, 297, 210);

// // Set the compression level to high
// pdf.output("datauristring", { compress: true });

// // Save the new PDF
// pdf.save("compressed.pdf");
var changePdf = require("change-pdf");
const input = __dirname + "/math.pdf";

changePdf.compressPdf(input, __dirname + "/cez1.pdf");
fs.unlinkSync(input);
