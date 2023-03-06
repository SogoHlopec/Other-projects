const fs = require("fs");
const path = require("path");

async function copyDir() {
  try {
    await fs.promises.rm(path.join(__dirname, "files-copy"), { recursive: true, force: true });
    await fs.promises.mkdir(path.join(__dirname, "./files-copy"), { recursive: true });
    const files = await fs.promises.readdir(path.join(__dirname, "files"));
    for (const file of files) {
      const fileFrom = path.join(__dirname, "files", file);
      const fileIn = path.join(__dirname, "files-copy", file);
      await fs.promises.copyFile(fileFrom, fileIn);
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
copyDir();