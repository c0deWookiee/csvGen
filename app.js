// window.onload = () => {
const csv = document.getElementsByClassName("csv")[0];
const button = document.getElementsByTagName("button")[0];
const formData = new FormData();
console.log(textArea, "what is this lol");

button.addEventListener("click", async () => {
  const body = textArea.files[0];

  formData.append("json", body);
  console.log(formData, "inside of post event", body);

  fetch("http://localhost:1337/generator", {
    method: "POST",
    body: body
  })
    .then(function(data) {
      console.log("Request success: ", data);
      return data.text();
    })
    .then(response => (csv.innerHTML = response))
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
  // console.log(res);
  // csv.innerHTML(`${res}`);
});
// };
