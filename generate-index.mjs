import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const assetsDir = 'dist/client/assets';
const files = readdirSync(assetsDir);

const cssFile = files.find(f => f.endsWith('.css'));
const jsFiles = files.filter(f => f.endsWith('.js') && (f.startsWith('index-') || f.startsWith('start-')));
const jsFile = jsFiles.sort((a, b) => {
  const sizeA = readFileSync(join(assetsDir, a)).length;
  const sizeB = readFileSync(join(assetsDir, b)).length;
  return sizeB - sizeA;
})[0];

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sakshi Mittal | Portfolio</title>
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>`;

writeFileSync('dist/client/index.html', html);
console.log(`✅ index.html generated!\n  CSS: ${cssFile}\n  JS:  ${jsFile}`);