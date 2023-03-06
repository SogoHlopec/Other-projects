const fs = require("fs");
const path = require("path");

async function createFolder() {
    await fs.promises.rm(path.join(__dirname, "project-dist"), { recursive: true, force: true });
    await fs.promises.mkdir(path.join(__dirname, "project-dist"), { recursive: true });
};

async function createHtml() {
  await fs.promises.copyFile(path.join(__dirname, "template.html"), path.join(__dirname, "./project-dist/index.html"));
  let dataIndexHtml = await fs.promises.readFile(path.join(__dirname, "./project-dist/index.html"), "utf-8");
  const filesComponents = await fs.promises.readdir(path.join(__dirname, "components"), { withFileTypes: true });
  for (const file of filesComponents) {
    const pathFileComponents = path.join(__dirname, "components", file.name);
    if (file.isFile() && path.extname(pathFileComponents).slice(1) === "html") {
      const componentFileName = file.name.split(".")[0];
      const dataComponentFIle = await fs.promises.readFile(pathFileComponents, "utf-8");
      dataIndexHtml = dataIndexHtml.replace(`{{${componentFileName}}}`, dataComponentFIle);
    }
  }
  const indexWriteStream = fs.createWriteStream(path.join(__dirname, "./project-dist/index.html"));
  indexWriteStream.write(dataIndexHtml);
};

async function mergeStyles() {
  const bundleWrite = fs.createWriteStream(path.join(__dirname, "./project-dist/style.css"));
  const files = await fs.promises.readdir(path.join(__dirname, "styles"), { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(path.join(__dirname, "styles"), file.name);
    if (file.isFile() && path.extname(filePath).slice(1) === "css") {
      const styleRead = fs.createReadStream(filePath, "utf-8");
      styleRead.pipe(bundleWrite);
    }
  }
};

async function copyDir(src, des) {
  if (des === true) {
    await fs.promises.rm(des, { recursive: true, force: true });
  } else {
    await fs.promises.mkdir(des, { recursive: true });
    const files = await fs.promises.readdir(src, { withFileTypes: true });
    for (const file of files) {
      const fileFrom = path.join(src, file.name);
      const fileIn = path.join(des, file.name);
      if (file.isFile()) {
        await fs.promises.copyFile(fileFrom, fileIn);
      }
      else {
        copyDir(path.join(src, file.name), path.join(des, file.name));
      }
    }
  }
};

async function buildPage() {
  try {
    await createFolder();
    const src = path.join(__dirname, "assets");
    const des = path.join(__dirname, "project-dist", "assets");
    await createHtml();
    await mergeStyles();
    await copyDir(src, des);
  }
  catch (error) {
    console.error(error.message);
  }
};
buildPage();