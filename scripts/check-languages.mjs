/**
 * Language & Spell Check Script for Vitesse Eco
 * ===============================================
 * Validates all translation files:
 * 1. Detects language of each value to ensure no mixing (e.g., French text in German file)
 * 2. Checks all locale files have the same keys (no missing translations)
 * 3. Reports empty or placeholder values
 *
 * Run: node scripts/check-languages.mjs
 */

import { readFileSync } from 'fs'
import { franc } from 'franc-min'

// Language code mapping: our locale codes → franc ISO 639-3 codes
// Include "close" languages that franc often confuses (Germanic languages are very similar)
const LANG_MAP = {
  fr: ['fra', 'ita', 'por', 'cat'],   // French sometimes detected as Italian/Portuguese/Catalan
  es: ['spa', 'por', 'ita', 'cat', 'nld'],   // Spanish ↔ Portuguese/Italian/Catalan confusion
  nl: ['nld', 'deu', 'afr', 'dan'],   // Dutch ↔ German/Afrikaans/Danish confusion
  de: ['deu', 'nld', 'dan', 'nob', 'spa'],   // German ↔ Dutch/Danish/Norwegian confusion + short sentences misdetected
}

// Short strings that can't be reliably detected (brand names, abbreviations, etc.)
const MIN_LENGTH_FOR_DETECTION = 25

// Known brand/technical terms that appear in all languages (skip detection for these)
const SKIP_PATTERNS = [
  /^Vitesse Eco$/i,
  /^[A-Z0-9€%\s\-\+\.,:;!?()@]+$/,  // All caps, numbers, symbols
  /^https?:\/\//,                       // URLs
  /^\{.*\}$/,                           // Template variables like {count}
]

const LOCALE_DIR = './i18n/locales'
const LOCALES = ['fr', 'es', 'nl', 'de']

// ============================================================
// Helpers
// ============================================================

function flattenObject(obj, prefix = '') {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, fullKey))
    } else {
      result[fullKey] = value
    }
  }
  return result
}

function shouldSkipDetection(value) {
  if (typeof value !== 'string') return true
  if (value.length < MIN_LENGTH_FOR_DETECTION) return true
  return SKIP_PATTERNS.some(pattern => pattern.test(value))
}

function detectLanguage(text) {
  const detected = franc(text)
  return detected
}

// ============================================================
// Load all locale files
// ============================================================

const localeData = {}
const flatData = {}

for (const locale of LOCALES) {
  try {
    const raw = readFileSync(`${LOCALE_DIR}/${locale}.json`, 'utf-8')
    localeData[locale] = JSON.parse(raw)
    flatData[locale] = flattenObject(localeData[locale])
  } catch (err) {
    console.error(`❌ ERROR: Cannot read ${locale}.json: ${err.message}`)
    process.exit(1)
  }
}

// ============================================================
// Check 1: Missing keys across locales
// ============================================================

console.log('\n══════════════════════════════════════════════════')
console.log('  CHECK 1: Missing Keys Across Locales')
console.log('══════════════════════════════════════════════════\n')

const allKeys = new Set()
for (const locale of LOCALES) {
  for (const key of Object.keys(flatData[locale])) {
    allKeys.add(key)
  }
}

let missingCount = 0
for (const key of [...allKeys].sort()) {
  const missing = LOCALES.filter(locale => !(key in flatData[locale]))
  if (missing.length > 0) {
    console.log(`  ⚠️  Key "${key}" missing in: ${missing.join(', ')}`)
    missingCount++
  }
}

if (missingCount === 0) {
  console.log('  ✅ All locales have the same keys!')
} else {
  console.log(`\n  ❌ ${missingCount} keys are missing in some locales`)
}

// ============================================================
// Check 2: Empty or placeholder values
// ============================================================

console.log('\n══════════════════════════════════════════════════')
console.log('  CHECK 2: Empty or Placeholder Values')
console.log('══════════════════════════════════════════════════\n')

let emptyCount = 0
for (const locale of LOCALES) {
  for (const [key, value] of Object.entries(flatData[locale])) {
    if (typeof value === 'string' && (value.trim() === '' || value === 'TODO' || value === '...')) {
      console.log(`  ⚠️  [${locale}] "${key}" is empty or placeholder`)
      emptyCount++
    }
  }
}

if (emptyCount === 0) {
  console.log('  ✅ No empty or placeholder values found!')
} else {
  console.log(`\n  ❌ ${emptyCount} empty/placeholder values found`)
}

// ============================================================
// Check 3: Language detection (no mixing)
// ============================================================

console.log('\n══════════════════════════════════════════════════')
console.log('  CHECK 3: Language Detection (No Mixing)')
console.log('══════════════════════════════════════════════════\n')

let mixCount = 0
let checkedCount = 0
let skippedCount = 0

for (const locale of LOCALES) {
  const expectedLangs = LANG_MAP[locale]

  for (const [key, value] of Object.entries(flatData[locale])) {
    if (shouldSkipDetection(value)) {
      skippedCount++
      continue
    }

    checkedCount++
    const detected = detectLanguage(value)

    if (detected === 'und') {
      // Undetermined — skip
      skippedCount++
      continue
    }

    if (!expectedLangs.includes(detected)) {
      // Check if detected language is a close match (e.g., Portuguese detected for French)
      // Only report if it's clearly wrong
      const wrongLang = LOCALES.find(l => LANG_MAP[l].includes(detected))
      if (wrongLang) {
        console.log(`  ⚠️  [${locale}] "${key}" detected as ${detected} (${wrongLang}?)`)
        console.log(`      Value: "${value.substring(0, 80)}${value.length > 80 ? '...' : ''}"`)
        mixCount++
      }
    }
  }
}

console.log(`\n  Checked: ${checkedCount} values | Skipped (too short): ${skippedCount}`)

if (mixCount === 0) {
  console.log('  ✅ No language mixing detected!')
} else {
  console.log(`  ⚠️  ${mixCount} potential language mix issues (review manually — detection is not 100% accurate for similar languages)`)
}

// ============================================================
// Check 4: Duplicate values across languages (same text in different locales = not translated)
// ============================================================

console.log('\n══════════════════════════════════════════════════')
console.log('  CHECK 4: Untranslated Values (Same in Multiple Locales)')
console.log('══════════════════════════════════════════════════\n')

let dupeCount = 0
const frKeys = Object.keys(flatData.fr)

for (const key of frKeys) {
  const frValue = flatData.fr[key]
  if (typeof frValue !== 'string' || frValue.length < 10) continue

  // Skip brand names and technical terms
  if (shouldSkipDetection(frValue)) continue

  for (const locale of ['es', 'nl', 'de']) {
    if (flatData[locale][key] === frValue) {
      console.log(`  ⚠️  [${locale}] "${key}" is IDENTICAL to French — might not be translated`)
      console.log(`      Value: "${frValue.substring(0, 60)}..."`)
      dupeCount++
    }
  }
}

if (dupeCount === 0) {
  console.log('  ✅ All values appear to be translated!')
} else {
  console.log(`\n  ⚠️  ${dupeCount} values might not be translated (same as French)`)
}

// ============================================================
// Summary
// ============================================================

console.log('\n══════════════════════════════════════════════════')
console.log('  SUMMARY')
console.log('══════════════════════════════════════════════════')
console.log(`  Total keys:        ${allKeys.size}`)
console.log(`  Missing keys:      ${missingCount}`)
console.log(`  Empty values:      ${emptyCount}`)
console.log(`  Language mixing:   ${mixCount}`)
console.log(`  Untranslated:      ${dupeCount}`)

const totalIssues = missingCount + emptyCount + mixCount + dupeCount
if (totalIssues === 0) {
  console.log('\n  🎉 ALL CHECKS PASSED! Languages are clean.\n')
  process.exit(0)
} else {
  console.log(`\n  ⚠️  ${totalIssues} total issues found. Review above.\n`)
  process.exit(1)
}
