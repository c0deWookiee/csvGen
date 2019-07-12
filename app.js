const csv = document.getElementsByClassName("csv")[0];
const button = document.getElementsByTagName("button")[0];
console.log(textArea, "what is this lol");
//post/////////////////////////////////////////////
button.addEventListener("click", async () => {
  const body = textArea.files[0];
  // formData.append("json", body);
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
});

//create and append function////////////////////////////
const createAppend = (element, body, className, event) => {
  const ele = document.createElement(element);
  const text = document.createTextNode(body);
  ele.appendChild(text);
  ele.className = className;

  if (event) {
    ele.addEventListener("click", () => {
      fetch("/download", {
        method: "POST",
        //body type must match content type
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ele.innerHTML })
      })
        .then(success => success.blob())
        .then(data => {
          console.log("success=>", data);
          const objectURL = URL.createObjectURL(data);
          const link = document.createElement("a");
          link.style.display = "none";
          document.body.appendChild(link);
          link.href = objectURL;
          // link.href = URL.createObjectURL(data);
          link.download = "data.csv";
          link.click();
        })
        .catch(err => console.log(err));
    });
  }
  return ele;
};

//get latest 5 csv////////////////////////////////////////
const download = document.getElementsByClassName("download")[0];
download.addEventListener("click", () => {
  fetch("./generator")
    .then(response => response.json())
    .then(data => {
      const list = document.getElementsByClassName("downloadList")[0];
      //while loop runs while children are present in list
      while (list.hasChildNodes()) list.removeChild(list.childNodes[0]);
      data = data.message;
      for (let counter = 0; counter < 5; counter++) {
        const body = data[data.length - 1 - counter];
        list.appendChild(createAppend("Li", body, "listItem", true));
      }
    });
});
