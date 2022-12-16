const fileInput = document.getElementById("input");
// function base64ToArrayBuffer(base64) {
//   var binaryString = window.atob(base64);
//   var binaryLen = binaryString.length;
//   var bytes = new Uint8Array(binaryLen);
//   for (var i = 0; i < binaryLen; i++) {
//     var ascii = binaryString.charCodeAt(i);
//     bytes[i] = ascii;
//   }
//   return bytes;
// }
// program to encode a string to Base64
// create Base64 Object
const Base64 = {
  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode: function (input) {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        Base64._keyStr.charAt(enc1) +
        Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) +
        Base64._keyStr.charAt(enc4);
    }

    return output;
  },

  // public method for decoding
  decode: function (input) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = Base64._keyStr.indexOf(input.charAt(i++));
      enc2 = Base64._keyStr.indexOf(input.charAt(i++));
      enc3 = Base64._keyStr.indexOf(input.charAt(i++));
      enc4 = Base64._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output;
  },

  // private method for UTF-8 encoding
  _utf8_encode: function (string) {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "";

    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode: function (utftext) {
    let string = "";
    let i = 0;
    let c = (c1 = c2 = 0);

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }
    return string;
  },
};

// define the string
// const string = 'Learning JavaScript';

// encode the String

var Base64Binary = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  /* will return a  Uint8Array type */
  decodeArrayBuffer: function (input) {
    var bytes = (input.length / 4) * 3;
    var ab = new ArrayBuffer(bytes);
    this.decode(input, ab);

    return ab;
  },

  removePaddingChars: function (input) {
    var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
    if (lkey == 64) {
      return input.substring(0, input.length - 1);
    }
    return input;
  },

  decode: function (input, arrayBuffer) {
    //get last chars to see if are valid
    input = this.removePaddingChars(input);
    input = this.removePaddingChars(input);

    var bytes = parseInt((input.length / 4) * 3, 10);

    var uarray;
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var j = 0;

    if (arrayBuffer) uarray = new Uint8Array(arrayBuffer);
    else uarray = new Uint8Array(bytes);

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    for (i = 0; i < bytes; i += 3) {
      //get the 3 octects in 4 ascii chars
      enc1 = this._keyStr.indexOf(input.charAt(j++));
      enc2 = this._keyStr.indexOf(input.charAt(j++));
      enc3 = this._keyStr.indexOf(input.charAt(j++));
      enc4 = this._keyStr.indexOf(input.charAt(j++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      uarray[i] = chr1;
      if (enc3 != 64) uarray[i + 1] = chr2;
      if (enc4 != 64) uarray[i + 2] = chr3;
    }

    return uarray;
  },
};
function base64ToArrayBuffer(base64) {
  console.log("coming");
  var binary_string = window.atob(base64);
  console.log("coming1");
  var len = binary_string.length;
  console.log("coming2");
  var bytes = new Uint8Array(len);
  console.log("coming3");
  //   a;
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  console.log("going");
  return bytes;
  //   var byteArray = Base64Binary.decode(base64);
  //   return byteArray;
  //   return decodeURIComponent(escape(window.atob(base64)));
}
document.querySelector(".files").addEventListener("click", () => {
  console.log("hello");
  var form = new FormData();
  form.append("inputFile", fileInput.files[0], "file");

  var settings = {
    url: "https://api.cloudmersive.com/convert/edit/pdf/optimize/reduce-file-size",
    method: "POST",
    timeout: 0,
    headers: {
      quality: "0.3",
      "Content-Type": "multipart/form-data",
      Apikey: "44004d43-b7af-42be-bcfb-9def6f06957f",
    },
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings)
    .done(function (file) {
      console.log("response");

      //   console.log(file);
      console.log("yes");
      return file;
    })
    .then((file) => {
      //   console.log(file);
      // var downloadedFile = base64ToArrayBuffer(atob(file));
      // const base64 = file.toString("base64");
      //   var base64EncodedStr = btoa(decodeURI(encodeURIComponent(file)));

      const encodedString = Base64.encode(file);
      console.log(file);
      const b64toBlob = (
        encodedString,
        contentType = "application/pdf",
        sliceSize = 512
      ) => {
        const byteCharacters = base64ToArrayBuffer(file).buffer;
        const byteArrays = [];

        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: "application/pdf" });
        return blob;
      };

      const contentType = "application/pdf";
      //   const b64Data =
      //     "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

      const blob = b64toBlob(encodedString, contentType);
      var downloadLink = document.createElement("a");
      downloadLink.target = "_blank";
      downloadLink.download = "name_to_give_saved_file.pdf";
      var URL = window.URL || window.webkitURL;
      var downloadUrl = URL.createObjectURL(blob);
      downloadLink.href = downloadUrl;
      document.body.append(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
      return;
      // decode the String
      //   const decodedString = Base64.decode(encodedString);
      //   console.log(decodedString);

      //   return;
      //   var bin = atob(encodedString);
      //   console.log("File Size:", Math.round(bin.length / 1024), "KB");
      //   console.log("PDF Version:", bin.match(/^.PDF-([0-9.]+)/)[1]);
      //   console.log(
      //     "Create Date:",
      //     bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]
      //   );
      //   console.log(
      //     "Modify Date:",
      //     bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]
      //   );
      //   console.log(
      //     "Creator Tool:",
      //     bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]
      //   );

      // Embed the PDF into the HTML page and show it to the user
      //   var obj = document.createElement("object");
      //   obj.style.width = "100%";
      //   obj.style.height = "842pt";
      //   obj.type = "application/pdf";
      //   obj.data = "data:application/pdf;base64," + encodedString;
      //   document.body.appendChild(obj);
      //   return;
      // Insert a link that allows the user to download the PDF file
      var link = document.createElement("a");
      link.innerHTML = "Download PDF file";
      link.download = "file.pdf";
      link.href = "data:application/octet-stream;base64," + encodedString;
      document.body.appendChild(link);
      var downloadedFile = base64ToArrayBuffer(encodedString);
      console.log("hmm", downloadedFile);
      //   return;
      // var downloadedFile = new Uint8Array(file);
      var downloadLink = document.createElement("a");
      downloadLink.target = "_blank";
      downloadLink.download = "name_to_give_saved_file.pdf";
      console.log(downloadedFile.buffer);
      // convert downloaded data to a Blob
      //   var blob = new Blob([downloadedFile], {
      //     type: "application/pdf",
      //   });
      // var blob = new Blob([file], { type: "application/pdf" });

      // create an object URL from the Blob
      var URL = window.URL || window.webkitURL;
      var downloadUrl = URL.createObjectURL(blob);

      // set object URL as the anchor's href
      downloadLink.href = downloadUrl;

      // append the anchor to document body
      document.body.append(downloadLink);

      // fire a click event on the anchor
      downloadLink.click();

      // cleanup: remove element and revoke object URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
    });
  //   return response;
});
// .then((downloadedFile) => {
//   // create a download anchor tag
//   var downloadLink = document.createElement("a");
//   downloadLink.target = "_blank";
//   downloadLink.download = "name_to_give_saved_file.pdf";
//   console.log(downloadedFile.data);
//   // convert downloaded data to a Blob
//   var blob = new Blob([downloadedFile], { type: "application/pdf" });

//   // create an object URL from the Blob
//   var URL = window.URL || window.webkitURL;
//   var downloadUrl = URL.createObjectURL(blob);

//   // set object URL as the anchor's href
//   downloadLink.href = downloadUrl;

//   // append the anchor to document body
//   document.body.append(downloadLink);

//   // fire a click event on the anchor
//   downloadLink.click();

//   // cleanup: remove element and revoke object URL
//   document.body.removeChild(downloadLink);
//   URL.revokeObjectURL(downloadUrl);
// });
// });
