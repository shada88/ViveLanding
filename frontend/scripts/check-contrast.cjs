const hex = h => { h=h.replace('#',''); return [0,2,4].map(i=>parseInt(h.substr(i,2),16)); };
const lin = c => { c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); };
const L = h => { const [r,g,b]=hex(h); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b); };
const ratio = (a,b) => { const l1=L(a),l2=L(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)); };

const pairs = [
  ['OSCURO  texto principal / fondo',      '#f2f6fc','#04070e', 4.5],
  ['OSCURO  texto variante / fondo',       '#a9b7ce','#04070e', 4.5],
  ['OSCURO  texto atenuado / fondo',       '#8e9cb5','#04070e', 4.5],
  ['OSCURO  atenuado / surface-highest',   '#8e9cb5','#1c2f4b', 4.5],
  ['OSCURO  dorado / fondo',               '#e6be73','#04070e', 4.5],
  ['OSCURO  azul primario / fondo',        '#9db8ff','#04070e', 4.5],
  ['OSCURO  on-ink / banda ink',           '#f2f6fc','#101c31', 4.5],
  ['OSCURO  on-ink-muted / banda ink',     '#8e9cb5','#101c31', 4.5],
  ['OSCURO  texto botón dorado',           '#2a1c06','#e6be73', 4.5],
  ['CLARO   texto principal / fondo',      '#0a1020','#f7f9fc', 4.5],
  ['CLARO   texto variante / surface-hi',  '#43506b','#d6deee', 4.5],
  ['CLARO   atenuado / surface-highest',   '#515c74','#d6deee', 4.5],
  ['CLARO   dorado / blanco',              '#8a6520','#ffffff', 4.5],
  ['CLARO   botón primario',               '#ffffff','#0047ab', 4.5],
  ['CLARO   dorado / gold-soft',           '#8a6520','#fbf3e2', 4.5],
];
let fail=0;
for (const [name,fg,bg,min] of pairs) {
  const r = ratio(fg,bg);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`  ${ok?'✓':'✗'} ${name.padEnd(34)} ${r.toFixed(2)}:1  (mín ${min})`);
}
console.log(fail ? `\n  ${fail} par(es) por debajo del mínimo.` : '\n  Todos los pares cumplen WCAG AA.');
process.exit(fail?1:0);
