const fs = require("fs");
const path = require("path");

async function mergeStyles() {
  try {
    const bundleWrite = fs.createWriteStream(path.join(__dirname, "./project-dist/bundle.css"));
    const files = await fs.promises.readdir(path.join(__dirname, "styles"), { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(path.join(__dirname, "styles"), file.name);
      if (file.isFile() && path.extname(filePath).slice(1) === "css") {
        const styleRead = fs.createReadStream(filePath, "utf-8");
        styleRead.pipe(bundleWrite);
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
mergeStyles();