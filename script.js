let url =
  "https://v2.convertapi.com/convert/pdf/to/compress?Secret=7z6j8tHCbhTe2Va5";

const files = async () => {
  let dat = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    Parameters: [
      {
        Name: "File",
        FileValue: {
          Name: "file.pdf",
          Data: "/file.pdf",
        },
      },
    ],
  });
  const data = await dat.json();
  console.log(data);
};

files();
// const res = await fetch(url + "/api/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     email: email,
//     password: password,
//   }),
// });
// const data = await res.json();
// return data;
