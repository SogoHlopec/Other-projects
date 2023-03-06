const fs = require("fs");
const path = require("path");

async function read() {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, "./secret-folder"), { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const name = file.name;
        const filePath = path.join(__dirname, "./secret-folder", name);
        const extension = path.extname(name).slice(1);
        fs.stat(filePath, (err, stats) => {
          console.log(`${name} - ${extension} - ${(stats.size / 1024).toFixed(3)}kb`);
        });
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
read();



