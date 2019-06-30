const salesReport = require("./sales_report");

const populateCSV = (report, fields) => {
  let output = "";
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
  return output.replace(/.$/, "\n");
};

// console.log(populateCSV(salesReport));

const restOfCSV = report => {
  //if the report is undefined return.
  if (report === undefined) return;
  //initiate a str variable
  //gather the values from the report into a string, separated by commas.
  let output = populateCSV(report, true)
    // .join(",")
    //replace the last character of the strin with a newline
    .replace(/.$/, "\n");
  //recursive call to affect all possible children
  for (let child of report.children) {
    output += restOfCSV(child);
  }

  //return the string
  return output;
};
console.log(restOfCSV(salesReport));
