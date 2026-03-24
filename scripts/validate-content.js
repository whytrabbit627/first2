import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentPath = join(__dirname, '../src/data/content.json');

const REQUIRED_FIELDS = ['id', 'title', 'category', 'subcategory', 'description', 'link', 'audience', 'stage'];
const VALID_CATEGORIES = ['items', 'health', 'resources'];
const VALID_AUDIENCES = ['mom', 'partner', 'both'];
const VALID_STAGES = ['pregnancy', 'newborn', 'first-year', 'all'];
const VALID_SUBCATEGORIES = {
  items:     ['Sleep', 'Feeding', 'Gear'],
  health:    ['Nutrition', 'Mental Health', 'Fitness'],
  resources: ['Books', 'Apps', 'Classes'],
};

const content = JSON.parse(readFileSync(contentPath, 'utf-8'));
let warningCount = 0;

function warn(id, message) {
  console.warn(`[validate-content] WARNING — item "${id}": ${message}`);
  warningCount++;
}

for (const item of content) {
  const id = item.id ?? '(no id)';

  for (const field of REQUIRED_FIELDS) {
    if (item[field] === undefined || item[field] === null || item[field] === '') {
      warn(id, `missing required field "${field}"`);
    }
  }

  if (item.category && !VALID_CATEGORIES.includes(item.category)) {
    warn(id, `invalid category "${item.category}" — must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (item.audience && !VALID_AUDIENCES.includes(item.audience)) {
    warn(id, `invalid audience "${item.audience}" — must be one of: ${VALID_AUDIENCES.join(', ')}`);
  }

  if (item.stage && !VALID_STAGES.includes(item.stage)) {
    warn(id, `invalid stage "${item.stage}" — must be one of: ${VALID_STAGES.join(', ')}`);
  }

  if (item.category && item.subcategory && VALID_SUBCATEGORIES[item.category]) {
    if (!VALID_SUBCATEGORIES[item.category].includes(item.subcategory)) {
      warn(id, `invalid subcategory "${item.subcategory}" for category "${item.category}" — must be one of: ${VALID_SUBCATEGORIES[item.category].join(', ')}`);
    }
  }

  if (!item.imageUrl || item.imageUrl === '') {
    warn(id, `missing or empty "imageUrl" field`);
  }
}

if (warningCount === 0) {
  console.log(`[validate-content] OK — ${content.length} items validated with no warnings.`);
} else {
  console.warn(`[validate-content] ${warningCount} warning(s) across ${content.length} items.`);
}
