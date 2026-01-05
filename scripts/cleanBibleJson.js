/**
 * Script to clean /n characters from Bible JSON files
 * Run with: node scripts/cleanBibleJson.js
 */

const fs = require('fs');
const path = require('path');

const BIBLE_DIR = path.join(__dirname, '../public/bible/es');

function cleanVerseText(text) {
  // Remove /n from the start of text
  let cleaned = text.replace(/^\/n/, '');
  // Replace internal /n with spaces (they don't render as line breaks anyway)
  cleaned = cleaned.replace(/\/n/g, ' ');
  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

function processJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    if (!data.verses || !Array.isArray(data.verses)) {
      return false;
    }
    
    let modified = false;
    data.verses.forEach(verse => {
      if (verse.text && verse.text.includes('/n')) {
        verse.text = cleanVerseText(verse.text);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let filesModified = 0;
  let filesProcessed = 0;
  
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      const result = processDirectory(itemPath);
      filesModified += result.modified;
      filesProcessed += result.processed;
    } else if (item.endsWith('.json') && item !== 'metadata.json') {
      filesProcessed++;
      if (processJsonFile(itemPath)) {
        filesModified++;
        console.log(`✓ Cleaned: ${itemPath}`);
      }
    }
  });
  
  return { modified: filesModified, processed: filesProcessed };
}

console.log('Starting Bible JSON cleanup...');
console.log(`Processing directory: ${BIBLE_DIR}`);

const result = processDirectory(BIBLE_DIR);
console.log(`\nDone!`);
console.log(`Files processed: ${result.processed}`);
console.log(`Files modified: ${result.modified}`);
