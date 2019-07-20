let digit = 1;
const populateCSV = (report, fields, digit) => {
  let output = "";
  const replacer = fields ? `,${digit}\n` : `,rowID,parentID\n`;
  //we don't want to include children in the final CSV report
  for (let key in report) {
    if (key === "children") {
      continue;
    }
    //if fields are true that means that we are using for values and not the keys.
    if (fields) {
      output += report[key] + ",";
    } else {
      output += key + ",";
    }
  } ///.$/ targets the last character in a string. 2nd arg is to input a  a new line
  return output.replace(/.$/, replacer);
};

// console.log(populateCSV(salesReport));

const restOfCSV = report => {
  if (report === undefined) return;
  let output = populateCSV(report, true, digit++);

  if (report.children)
    for (let child of report.children) {
      output += restOfCSV(child);
    }

  //return the string
  return output;
};

const generateCSV = report => {
  digit = 1;
  return populateCSV(report) + restOfCSV(report);
};

module.exports.generateCSV = generateCSV;
