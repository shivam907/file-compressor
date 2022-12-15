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
  //   console.log("coming");
  //   var binary_string = window.atob(base64);
  //   console.log("coming1");
  //   var len = binary_string.length;
  //   console.log("coming2");
  //   var bytes = new Uint8Array(len);
  //   console.log("coming3");
  //   //   a;
  //   for (var i = 0; i < len; i++) {
  //     bytes[i] = binary_string.charCodeAt(i);
  //   }
  //   console.log("going");
  //   return bytes.buffer;
  var byteArray = Base64Binary.decodeArrayBuffer(base64);
  return byteArray;
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

  $.ajax(settings).done(function (file) {
    console.log("response");

    //   console.log(file);
    console.log("yes");
    var downloadedFile = base64ToArrayBuffer(file);
    console.log("hmm", downloadedFile);
    // var downloadedFile = new Uint8Array(file);
    var downloadLink = document.createElement("a");
    downloadLink.target = "_blank";
    downloadLink.download = "name_to_give_saved_file.pdf";
    console.log(downloadedFile.data);
    // convert downloaded data to a Blob
    var blob = new Blob([downloadedFile], { type: "application/pdf" });

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
