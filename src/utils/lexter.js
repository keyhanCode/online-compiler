class Lexer {
  constructor() {
    this.inputfile = "";
    this.cError = "";
    this.cPoint = -1;
    this.cState = 0;
    this.lineNumber = 0;
    this.letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.nonzero = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.spaces = ["\n", "\t", " "];
    this.keywords = [
      "if",
      "then",
      "else",
      "integer",
      "float",
      "string",
      "void",
      "public",
      "private",
      "func",
      "var",
      "class",
      "while",
      "read",
      "write",
      "return",
      "main",
      "inherits",
      "break",
      "continue",
      "true",
      "false",
      "for",
    ];
  }

  getToken() {
    let ch = "";
    this.cState = 0;
    let lexeme = "";
    while (true) {
      if (this.cState == 0) {
        ch = this.nextChar();
        lexeme += ch;
        if (this.isLetters(ch)) {
          this.cState = 1;
        } else if (this.isNonzero(ch)) {
          this.cState = 4;
        } else if (ch == "0") {
          this.cState = 8;
        } else if (ch == "+") {
          this.cState = 2;
        } else if (ch == "-") {
          this.cState = 3;
        } else if (ch == "_") {
          this.cState = 1;
        } else if (ch == '"') {
          this.cState = 11;
        } else if (this.isSpaces(ch)) {
          this.cState = 13;
        } else if (ch == "<") {
          this.cState = 14;
        } else if (ch == ">") {
          this.cState = 16;
        } else if (ch == "=") {
          this.cState = 18;
        } else if (ch == "!") {
          this.cState = 19;
        } else if (ch == ";") {
          this.cState = 20;
        } else if (ch == ",") {
          this.cState = 21;
        } else if (ch == ".") {
          this.cState = 22;
        } else if (ch == ":") {
          this.cState = 23;
        } else if (ch == "(") {
          this.cState = 25;
        } else if (ch == ")") {
          this.cState = 26;
        } else if (ch == "{") {
          this.cState = 27;
        } else if (ch == "}") {
          this.cState = 28;
        } else if (ch == "[") {
          this.cState = 29;
        } else if (ch == "]") {
          this.cState = 30;
        } else if (ch == "/") {
          this.cState = 31;
        } else if (ch == "*") {
          this.cState = 37;
        } else if (ch == "&") {
          this.cState = 38;
        } else if (ch == "|") {
          this.cState = 39;
        } else if (ch == "?") {
          this.cState = 40;
        } else if (ch == "$") {
          this.cState = 41;
        } else {
          return this.setError(lexeme + " IS NOT DEFINED");
        }
      } else if (this.cState == 1) {
        if (
          this.isLetters(this.whatIsNextChar()) ||
          this.isDigits(this.whatIsNextChar()) ||
          this.whatIsNextChar() == "_"
        ) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 1;
        } else {
          if (this.isKeywords(lexeme)) {
            return "<T_KEYWORD," + lexeme + ">";
          } else {
            return "<T_ID," + lexeme + ">";
          }
        }
      } else if (this.cState == 2) {
        if (this.isNonzero(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 4;
        } else if (this.whatIsNextChar() == "0") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 8;
        } else {
          return "<T_MATH_OP," + lexeme + ">";
        }
      } else if (this.cState == 3) {
        if (this.isNonzero(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 4;
        } else if (this.whatIsNextChar() == "0") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 8;
        } else {
          return "<T_MATH_OP," + lexeme + ">";
        }
      } else if (this.cState == 4) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 4;
        } else if (
          this.whatIsNextChar() == "e" ||
          this.whatIsNextChar() == "E"
        ) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 7;
        } else if (this.whatIsNextChar() == ".") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 5;
        } else {
          return "<T_NUM_INTEGER," + lexeme + ">";
        }
      } else if (this.cState == 5) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 6;
        } else {
          ch = this.nextChar();
          lexeme += ch;
          return this.setError(lexeme + " IS NOT DEFINED");
        }
      } else if (this.cState == 6) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 6;
        } else if (
          this.whatIsNextChar() == "e" ||
          this.whatIsNextChar() == "E"
        ) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 7;
        } else {
          return "<T_NUM_FLOAT," + lexeme + ">";
        }
      } else if (this.cState == 7) {
        if (this.whatIsNextChar() == "+" || this.whatIsNextChar() == "-") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 9;
        } else {
          return this.setError(
            lexeme + this.whatIsNextChar() + " IS NOT DEFINED"
          );
        }
      } else if (this.cState == 8) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 88;
        } else {
          return "<T_NUM_INTEGER," + lexeme + ">";
        }
      } else if (this.cState == 88) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 88;
        } else {
          return this.setError(lexeme + " IS NOT DEFINED");
        }
      } else if (this.cState == 9) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 10;
        } else {
          ch = this.nextChar();
          lexeme += ch;
          return this.setError(lexeme + " IS NOT DEFINED");
        }
      } else if (this.cState == 10) {
        if (this.isDigits(this.whatIsNextChar())) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 10;
        } else {
          return "<T_NUM_FLOAT," + lexeme + ">";
        }
      } else if (this.cState == 11) {
        if (
          this.isLetters(this.whatIsNextChar()) ||
          this.isDigits(this.whatIsNextChar()) ||
          this.isSpaces(this.whatIsNextChar()) ||
          this.whatIsNextChar() == "_"
        ) {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 11;
        } else if (this.whatIsNextChar() == '"') {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 12;
        } else {
          ch = this.nextChar();
          lexeme += ch;
          return this.setError(lexeme + " IS NOT DEFINED");
        }
      } else if (this.cState == 12) {
        return "<T_STRING," + lexeme + ">";
      } else if (this.cState == 13) {
        if (this.isSpaces(this.whatIsNextChar())) {
          this.nextChar();
          this.cState = 13;
        } else {
          lexeme = "";
          this.cState = 0;
        }
      } else if (this.cState == 14) {
        if (this.whatIsNextChar() == ">" || this.whatIsNextChar() == "=") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 17;
        } else {
          return "<T_LOGIC_OP," + lexeme + ">";
        }
      } else if (this.cState == 16) {
        if (this.whatIsNextChar() == "=") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 17;
        } else {
          return "<T_LOGIC_OP," + lexeme + ">";
        }
      } else if (this.cState == 18) {
        if (this.whatIsNextChar() == "=") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 17;
        } else {
          return "<T_SPECIAL_CHAR," + lexeme + ">";
        }
      } else if (this.cState == 19) {
        if (this.whatIsNextChar() == "=") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 17;
        } else {
          return "<T_LOGIC_OP," + lexeme + ">";
        }
      } else if (this.cState == 17) {
        return "<T_LOGIC_OP," + lexeme + ">";
      } else if (this.cState == 20) {
        return "<T_SPECIAL_CHAR," + lexeme + ">";
      } else if (this.cState == 21) {
        return "<T_SPECIAL_CHAR," + lexeme + ">";
      } else if (this.cState == 22) {
        return "<T_SPECIAL_CHAR," + lexeme + ">";
      } else if (this.cState == 23) {
        if (this.whatIsNextChar() == ":") {
          ch = this.nextChar();
          lexeme += ch;
          this.cState = 24;
        } else {
          return "<T_SPECIAL_CHAR," + lexeme + ">";
        }
      } else if (
        this.cState == 24 ||
        this.cState == 25 ||
        this.cState == 26 ||
        this.cState == 27 ||
        this.cState == 28 ||
        this.cState == 29 ||
        this.cState == 30
      ) {
        return "<T_SPECIAL_CHAR," + lexeme + ">";
      } else if (this.cState == 31) {
        lexeme = "";
        if (this.whatIsNextChar() == "/") {
          this.nextChar();
          this.cState = 32;
        } else if (this.whatIsNextChar() == "*") {
          this.nextChar();
          this.cState = 34;
        } else {
          return "<T_MATH_OP,/>";
        }
      } else if (this.cState == 32) {
        if (this.whatIsNextChar() == "$") {
          return this.setError("COMMENT ERROR");
        } else if (this.whatIsNextChar() == "\n") {
          this.nextChar();
          this.cState = 0;
        } else {
          this.nextChar();
          this.cState = 32;
        }
      } else if (this.cState == 34) {
        if (this.whatIsNextChar() == "$") {
          return this.setError("COMMENT ERROR");
        } else if (this.whatIsNextChar() == "*") {
          this.cState = 35;
          this.nextChar();
        } else {
          this.nextChar();
          this.cState = 34;
        }
      } else if (this.cState == 35) {
        if (this.whatIsNextChar() == "$") {
          return this.setError("COMMENT ERROR");
        } else if (this.whatIsNextChar() == "*") {
          this.cState = 35;
          this.nextChar();
        } else if (this.whatIsNextChar() == "/") {
          this.nextChar();
          this.cState = 0;
        } else {
          this.nextChar();
          this.cState = 34;
        }
      } else if (this.cState == 37) {
        return "<T_MATH_OP," + lexeme + ">";
      } else if (this.cState == 38 || this.cState == 39 || this.cState == 40) {
        return "<T_logic_OP," + lexeme + ">";
      } else if (this.cState == 41) {
        return "$";
      }
    }
  }
  nextChar() {
    this.cPoint += 1;
    if (this.cPoint >= this.inputfile.length) {
      return "$";
    }
    let ch = this.inputfile[this.cPoint];
    if (ch == "\n") {
      this.lineNumber += 1;
    }
    return ch;
  }

  whatIsNextChar() {
    let nextCharPoint = this.cPoint + 1;

    if (nextCharPoint >= this.inputfile.length) {
      return "$";
    }

    let ch = this.inputfile[nextCharPoint];

    return ch;
  }

  isLetters(ch) {
    return this.letters.includes(ch);
  }

  isSpaces(ch) {
    return this.spaces.includes(ch);
  }

  isDigits(ch) {
    return this.digits.includes(ch);
  }

  isKeywords(word) {
    return this.keywords.includes(word);
  }

  isNonzero(ch) {
    return this.nonzero.includes(ch);
  }

  setPath(path) {
    this.inputfile = "";
    try {
      const fs = require("fs");
      this.inputfile = fs
        .readFileSync(path, "utf-8")
        .trim()
        .replace(/\r\n/g, "\n");
    } catch (error) {
      console.log("Source File not Found");
      console.log(error);
    }
  }

  setError(error) {
    this.cError = `${error} line : ${this.lineNumber}`;
    return "error";
  }

  getError() {
    return this.cError;
  }
}

module.exports = Lexer;
