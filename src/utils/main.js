const fs = require("fs");
const Driver = require("./Driver.js");
const path = require("path");

const resPath = path.join(__dirname, "../../outlextokens/test.txt");
const errorPath = path.join(__dirname, "../../outlexerrors/test.txt");

let responss;
let errorr;
function creatFile(code, callback) {
  fs.writeFile("test.txt", code, () => {
    let lines = [];

    lines.push("test");

    const currentPath = process.cwd();
    console.log(currentPath);

    const driver = new Driver();
    driver.setPath(currentPath);

    driver.write(lines);
    setTimeout(function () {
      fs.readFile(resPath, (err, data) => {
        responss = data.toString();

        console.log(responss);
        fs.readFile(errorPath, (err, data) => {
          errorr = data.toString();

          callback(errorr, responss);
          fs.writeFile(resPath, "", () => {
            console.log("pak shod");
          });
          fs.writeFile(errorPath, "", () => {
            console.log("pak shod");
          });
        });
      });
    }, 100);
  });
}
module.exports = creatFile;
