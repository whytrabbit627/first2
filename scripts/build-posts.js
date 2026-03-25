import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, basename } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import readingTime from 'reading-time'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = join(__dirname, '../src/content/posts')
const publicPostsDir = join(__dirname, '../public/posts')
const indexOutput = join(__dirname, '../public/blog-index.json')

const REQUIRED_FIELDS = ['title', 'slug', 'category', 'subcategory', 'stage', 'audience', 'summary', 'publishedAt', 'draft']
const VALID_CATEGORIES = ['items', 'health', 'resources']
const VALID_STAGES = ['pregnancy', 'newborn', 'first-year', 'all']
const VALID_AUDIENCES = ['mom', 'partner', 'both']

let errorCount = 0

function fail(slug, message) {
  console.error(`[build-posts] ERROR — "${slug}": ${message}`)
  errorCount++
}

mkdirSync(publicPostsDir, { recursive: true })

const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))
const posts = []

for (const file of files) {
  const filePath = join(postsDir, file)
  const raw = readFileSync(filePath, 'utf-8')
  const { data: fm, content: body } = matter(raw)

  const expectedSlug = basename(file, '.md')

  // Validate slug matches filename
  if (fm.slug !== expectedSlug) {
    fail(file, `slug "${fm.slug}" does not match filename "${expectedSlug}"`)
    continue
  }

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      fail(fm.slug ?? file, `missing required frontmatter field "${field}"`)
    }
  }

  if (fm.category && !VALID_CATEGORIES.includes(fm.category)) {
    fail(fm.slug, `invalid category "${fm.category}"`)
  }
  if (fm.stage && !VALID_STAGES.includes(fm.stage)) {
    fail(fm.slug, `invalid stage "${fm.stage}"`)
  }
  if (fm.audience && !VALID_AUDIENCES.includes(fm.audience)) {
    fail(fm.slug, `invalid audience "${fm.audience}"`)
  }

  // Skip drafts
  if (fm.draft === true) continue

  const rt = readingTime(body)
  const htmlBody = marked(body)

  const meta = {
    slug: fm.slug,
    title: fm.title,
    category: fm.category,
    subcategory: fm.subcategory,
    stage: fm.stage,
    audience: fm.audience,
    summary: fm.summary,
    tags: fm.tags ?? [],
    affiliateUrl: fm.affiliateUrl ?? '',
    affiliateLabel: fm.affiliateLabel ?? '',
    imageUrl: fm.imageUrl ?? '',
    readingTime: rt.text,
    publishedAt: fm.publishedAt,
    draft: fm.draft,
  }

  // Write individual post file (metadata + HTML body)
  writeFileSync(
    join(publicPostsDir, `${fm.slug}.json`),
    JSON.stringify({ ...meta, body: htmlBody }, null, 2)
  )

  posts.push(meta)
}

if (errorCount > 0) {
  console.error(`[build-posts] ${errorCount} error(s) found. Fix them before building.`)
  process.exit(1)
}

// Sort by publishedAt descending
posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

writeFileSync(
  indexOutput,
  JSON.stringify({ generatedAt: new Date().toISOString(), posts }, null, 2)
)

console.log(`[build-posts] OK — ${posts.length} posts written.`)
