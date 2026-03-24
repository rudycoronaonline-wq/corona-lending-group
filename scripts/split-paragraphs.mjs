/**
 * Split multi-sentence paragraphs into one sentence per paragraph in blog markdown.
 * Only splits after a lowercase letter + period + space + uppercase (likely sentence boundary).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../src/content/blog');

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

// Sentence boundary: lowercase letter, period, space, then uppercase letter starting a word
// Avoids splitting "U.S." or "3.5" or "e.g."
const SENTENCE_END = /([a-z])\. ([A-Z])/g;

function splitParagraphs(text) {
  return text.replace(SENTENCE_END, '$1.\n\n$2');
}

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const fmEnd = content.indexOf('\n---', 3);
  if (fmEnd === -1) {
    console.warn('No frontmatter in', file);
    continue;
  }
  const frontmatter = content.slice(0, fmEnd + 4);
  let body = content.slice(fmEnd + 4);

  // Split only in paragraph lines (not in list items, table rows, or headings)
  const lines = body.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    const indent = line.slice(0, line.length - trimmed.length);

    // Don't split: empty lines, headings, list items, table rows, block quotes
    if (
      line === '' ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('|') ||
      trimmed.startsWith('>') ||
      /^\d+\.\s/.test(trimmed) ||
      trimmed.startsWith('**') // bold list labels
    ) {
      out.push(line);
      continue;
    }

    // Apply sentence split to this line
    const rewritten = splitParagraphs(line);
    if (rewritten !== line) {
      out.push(rewritten);
    } else {
      out.push(line);
    }
  }

  body = out.join('\n');
  const newContent = frontmatter + body;
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log('Updated', file);
  }
}

console.log('Done.');
