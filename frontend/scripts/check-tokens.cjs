#!/usr/bin/env node
/**
 * Verificador de tokens CSS — Fundación Vive con Esperanza.
 *
 * Busca tokens que se USAN pero nunca se DEFINEN. Es el fallo más silencioso
 * del sistema: una variable inexistente no lanza ningún error, el navegador
 * simplemente descarta la declaración y la propiedad cae a su valor heredado.
 * Un `color: var(--color-gold-brigth)` mal tipeado no se ve roto: se ve como
 * un texto que heredó otro color, y así puede vivir meses.
 *
 * Las variables que se inyectan desde JavaScript o desde un `style` en JSX
 * —`--i`, `--delay`, `--px`…— se declaran en la lista de exentas y además
 * DEBEN llevar valor de respaldo en su `var()`. Si el elemento no llegara a
 * escribirlas, el respaldo es lo único que evita una declaración inválida.
 *
 *   node scripts/check-tokens.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'src');

/**
 * Tokens escritos en tiempo de ejecución que NO tienen declaración en CSS.
 *
 * `--cord-progress` no está en la lista a propósito: se declara con su valor
 * inicial en `.host` y el JavaScript solo lo sobrescribe. Declararlo en CSS es
 * más robusto que un valor de respaldo, porque el estado por defecto queda
 * escrito una vez y no repetido en cada `var()` que lo consuma.
 */
const RUNTIME_TOKENS = new Set([
  '--i',
  '--delay',
  '--dur',
  '--px',
  '--py',
  '--reveal-index',
]);

function collectFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectFiles(full));
    else if (/\.(css|tsx|ts)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const defined = new Set();
const used = new Map();
const missingFallback = [];

for (const file of collectFiles(ROOT)) {
  const source = fs.readFileSync(file, 'utf8');

  for (const match of source.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)) {
    defined.add(match[1]);
  }

  for (const match of source.matchAll(/var\(\s*(--[a-z0-9-]+)\s*(,)?/gi)) {
    const [, token, hasFallback] = match;
    if (!used.has(token)) used.set(token, new Set());
    used.get(token).add(path.relative(ROOT, file));

    if (RUNTIME_TOKENS.has(token) && !hasFallback) {
      missingFallback.push(`${token} en ${path.relative(ROOT, file)}`);
    }
  }
}

const undefinedTokens = [...used.keys()]
  .filter((token) => !defined.has(token) && !RUNTIME_TOKENS.has(token))
  .sort();

console.log(`Tokens definidos: ${defined.size} · usados: ${used.size}`);

let failed = false;

if (undefinedTokens.length) {
  failed = true;
  console.error('\n✗ Tokens usados pero NUNCA definidos:');
  for (const token of undefinedTokens) {
    console.error(`  ${token}`);
    for (const file of used.get(token)) console.error(`      ${file}`);
  }
}

if (missingFallback.length) {
  failed = true;
  console.error('\n✗ Tokens de ejecución sin valor de respaldo:');
  for (const entry of missingFallback) console.error(`  ${entry}`);
}

if (failed) process.exit(1);

console.log('✓ Sin tokens huérfanos y todos los de ejecución con respaldo.');
