#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

// Function to reindent Python code
function reindentPythonCode(code) {
  const lines = code.split('\n');
  let indentationLevel = 0;
  const indentedLines = [];

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.endsWith(':')) {
      indentedLines.push(' '.repeat(indentationLevel) + trimmedLine);
      indentationLevel += 4; // Increase indentation after block starter
    } else if (trimmedLine === '') {
      indentedLines.push('');
    } else {
      if (trimmedLine.startsWith('return') || trimmedLine.startsWith('pass') || trimmedLine.startsWith('break')) {
        indentationLevel -= 4; // Dedent for block-ending statements
      }
      indentedLines.push(' '.repeat(indentationLevel) + trimmedLine);
    }
  });

  return indentedLines.join('\n');
}

// Function to read Python code from a file
function formatPythonFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const formattedCode = reindentPythonCode(data);
    fs.writeFile(filePath, formattedCode, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Python code has been successfully formatted.');
      }
    });
  });
}

// Export for CLI or programmatic use
module.exports = { reindentPythonCode, formatPythonFile };

// CLI usage
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log('Usage: node index.js <path_to_python_file>');
    process.exit(1);
  }
  formatPythonFile(filePath);
}
