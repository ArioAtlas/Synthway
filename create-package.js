const fs = require('fs');
const path = require('path');

const originalPackage = require('./package.json');

const minimalPackage = {
  name: originalPackage.name,
  version: originalPackage.version,
  description: originalPackage.description,
  main: originalPackage.main,
  types: originalPackage.types,
  dependencies: originalPackage.dependencies,
  repository: originalPackage.repository,
  keywords: originalPackage.keywords,
  author: originalPackage.author,
  license: originalPackage.license,
  bugs: originalPackage.bugs,
  homepage: originalPackage.homepage
  // Add other fields as necessary
};

fs.writeFileSync(path.resolve(__dirname, 'dist', 'package.json'), JSON.stringify(minimalPackage, null, 2));
