#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
const { SingleBar } = require('cli-progress');

const TEMPLATE_DIR = path.join(__dirname, '../templates/cartridge');
const DEST_DIR = path.resolve(process.cwd());

function renameFiles(destDir, cartridgeName) {
  const placeholderName = 'cartridgeName';
  const filesToRename = [
    path.join(destDir, placeholderName),
    path.join(destDir, placeholderName, `${placeholderName}.isml`)
  ];

  filesToRename.forEach(file => {
    const newFileName = file.replace(placeholderName, cartridgeName);
    fs.renameSync(file, newFileName);
  });

  const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(new RegExp(placeholderName, 'g'), cartridgeName);
    fs.writeFileSync(filePath, content, 'utf8');
  };

  replaceInFile(path.join(destDir, cartridgeName, `${cartridgeName}.isml`));
}

inquirer.prompt([
  {
    type: 'input',
    name: 'cartridgeName',
    message: 'Enter the name of the new cartridge:',
    validate: function (input) {
      if (input.trim() === '') {
        return 'Cartridge name cannot be empty';
      }
      return true;
    }
  }
]).then(answers => {
  const { cartridgeName } = answers;
  const destDir = path.join(DEST_DIR, cartridgeName);

  console.log('Creating cartridge structure...');

  const progressBar = new SingleBar({
    format: 'Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} Files',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });

  const filesToCopy = [
    'controllers',
    'models',
    'scripts',
    'static',
    'templates',
    'cartridgeName/cartridgeName.isml'
  ];

  let progress = 0;
  const totalFiles = filesToCopy.length;

  progressBar.start(totalFiles, 0);


  filesToCopy.forEach(file => {
    const source = path.join(TEMPLATE_DIR, file);
    const destination = path.join(destDir, file);

    ncp(source, destination, function (err) {
      if (err) {
        return console.error(err);
      }

      progress++;
      progressBar.update(progress);

      if (progress === totalFiles) {
        progressBar.stop();
        renameFiles(destDir, cartridgeName);
        console.log(`\nCartridge ${cartridgeName} created successfully at ${destDir}`);
      }
    });
  });
});
