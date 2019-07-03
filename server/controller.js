//handles all of the
const CSVGen = require("./server").generateCSV;
const htmltemplate = csv => {
  const output = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>csvGEN</title>
      <style> .csv {
        white-space : pre;

      }
      </style>
    </head>
    <body>
      <div>hello from server</div>
      <div class="csv"> ${csv}</div>
  
      <form action="/generator" method="POST">
        <textarea name="body" id="" cols="30" rows="30"></textarea>
        <button type="submit">postJSON</button>
      </form>
    </body>
  </html>
  `;

  return output;
};

module.exports = {
  get: (req, res) => {
    console.log(`it's a get request`);
    res.send("yougot it boss");
  },
  post: (req, res) => {
    console.log(req.body);
    const output = CSVGen(req.body);
    console.log(output, "this is after parsing");
    res.send(output);
  }
};
