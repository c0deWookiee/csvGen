// window.onload = () => {
const csv = document.getElementsByClassName("csv")[0];
const button = document.getElementsByTagName("button")[0];
console.log(textArea, "what is this lol");
button.addEventListener("click", async () => {
  const body = textArea.value;
  console.log(typeof body, "inside of post event");

  fetch("http://localhost:1337/generator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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
