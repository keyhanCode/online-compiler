const os = require("os");
const fs = require("fs");
const Lexer = require("./lexter.js");

class Driver {
  constructor() {
    this.path = "";
  }

  setPath(path) {
    this.path = path;
  }

  write(lines) {
    for (const nameOfFile of lines) {
      const tFile = `${this.path}/outlextokens/${nameOfFile}.txt`;
      const eFile = `${this.path}/outlexerrors/${nameOfFile}.txt`;

      try {
        if (!fs.existsSync(`${this.path}/outlextokens`)) {
          fs.mkdirSync(`${this.path}/outlextokens`);
        }
        if (!fs.existsSync(`${this.path}/outlexerrors`)) {
          fs.mkdirSync(`${this.path}/outlexerrors`);
        }

        const f1 = fs.createWriteStream(tFile, { flags: "w+" });
        const f2 = fs.createWriteStream(eFile, { flags: "w+" });

        console.log("Files created successfully.");

        const la = new Lexer();
        la.setPath(`${this.path}/${nameOfFile}.txt`);
        while (true) {
          const token = la.getToken();
          if (token === "error") {
            f2.write(`${la.getError()}\n`);
            continue;
          }
          f1.write(`${token}\n`);

          if (token === "$") {
            break;
          }
        }

        f1.close();
        f2.close();
      } catch (err) {
        console.log("An error occurred while creating the files.");
        console.error(err);
      }
    }
  }
}

module.exports = Driver;
