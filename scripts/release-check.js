const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function walkFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, list);
    } else {
      list.push(fullPath);
    }
  }

  return list;
}

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

function fileHashSHA256(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function relativeToRoot(root, target) {
  return path.relative(root, target).split(path.sep).join('/');
}

function main() {
  const root = path.resolve(__dirname, '..');
  const makeDir = path.join(root, 'out', 'make');

  if (!fs.existsSync(makeDir)) {
    console.error('No se encontro out/make. Ejecuta primero: npm run make');
    process.exit(1);
  }

  const allFiles = walkFiles(makeDir);
  const deliverableFiles = allFiles.filter((filePath) => {
    const lower = filePath.toLowerCase();
    return lower.endsWith('.exe') || lower.endsWith('.nupkg') || lower.endsWith('.msi');
  });

  if (deliverableFiles.length === 0) {
    console.error('No se encontraron artefactos de instalacion en out/make');
    process.exit(1);
  }

  const rows = deliverableFiles
    .map((filePath) => {
      const stat = fs.statSync(filePath);
      return {
        filePath,
        relative: relativeToRoot(root, filePath),
        bytes: stat.size,
        mtime: stat.mtimeMs,
      };
    })
    .sort((a, b) => b.mtime - a.mtime);

  console.log('Artefactos detectados:');
  for (const row of rows) {
    console.log('- Archivo:', row.relative);
    console.log('  Tamano MB:', formatMB(row.bytes));
    console.log('  SHA256:', fileHashSHA256(row.filePath));
  }

  const setup = rows.find((row) => row.relative.toLowerCase().endsWith('setup.exe'));
  const latestExe = rows.find((row) => row.relative.toLowerCase().endsWith('.exe'));

  console.log('');
  console.log('Entrega recomendada demo:');
  if (setup) {
    console.log('- Instalador:', setup.relative);
  } else if (latestExe) {
    console.log('- Ejecutable:', latestExe.relative);
  }

  const latestNupkg = rows.find((row) => row.relative.toLowerCase().endsWith('.nupkg'));
  if (latestNupkg) {
    console.log('- Paquete delta/full:', latestNupkg.relative);
  }
}

main();
