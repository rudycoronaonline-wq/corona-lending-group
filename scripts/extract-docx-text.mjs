/**
 * Extract plain text from docx document.xml (run after unzipping .docx to temp_docx)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docPath = path.join(__dirname, '../temp_docx/word/document.xml');
const outPath = path.join(__dirname, '../src/content/corona-lending-blog-posts-extracted.txt');

const xml = fs.readFileSync(docPath, 'utf8');
// Extract text from <w:t> elements; handle line breaks from <w:br/>
const textNodes = xml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
const breaks = (xml.match(/<w:br\/>/g) || []).length;
let text = textNodes.map((tag) => tag.replace(/<w:t[^>]*>([^<]*)<\/w:t>/, '$1')).join('');

// Replace XML entities
text = text
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

fs.writeFileSync(outPath, text, 'utf8');
console.log('Extracted', text.length, 'chars to', outPath);
