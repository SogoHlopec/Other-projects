const fs = require("fs");
const path = require("path");
const { stdout, stdin } = process;

const output = fs.createWriteStream(path.join(__dirname, "text.txt"), "utf-8");
stdout.write("Hello, enter text. To exit, enter 'exit'\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    process.exit(stdout.write("Good bye!"));
  }
  output.write(data);
})
process.on('SIGINT', () => process.exit(stdout.write("Good bye!")));