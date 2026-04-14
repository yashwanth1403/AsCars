const fs = require('fs');
const path = require('path');

function replaceInLine(content) {
  return content
    .replace(/Mohan's Motors/g, "National Motors")
    .replace(/MohansMotors/g, "NationalMotors")
    .replace(/mohansmotors/gi, "nationalmotors")
    .replace(/98486 66600/g, "98480 15809")
    .replace(/9848666600/g, "9848015809")
    .replace(/\+91 98486 66600/g, "+91 98480 15809");
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const newContent = replaceInLine(content);
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}
processDir(path.resolve('./src'));
