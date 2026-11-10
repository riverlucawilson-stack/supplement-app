// Runs a command and keeps its output short when it works.
//   - If the command succeeds: prints only its last few lines (e.g. "265 page(s) built").
//   - If it fails: prints everything, so the error is never hidden.
// The exit code is passed through, so pass/fail is exactly the same as running the command directly.
//
// Used by "npm run build:brief" and "npm run test:brief" to keep Claude's context small.
// Example:  tsx scripts/quiet.ts astro build
import { spawnSync } from 'node:child_process';

const KEEP_LINES = 6;
const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error('Usage: tsx scripts/quiet.ts <command> [args...]');
  process.exit(2);
}

// shell: true finds tools in node_modules/.bin on every OS (npm adds that folder to PATH).
const run = spawnSync([command, ...args].join(' '), {
  shell: true,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  // NO_COLOR keeps color codes out of the text; FORCE_COLOR is removed because some tools turn color on if it's set at all.
  env: { ...process.env, FORCE_COLOR: undefined, NO_COLOR: '1', ASTRO_TELEMETRY_DISABLED: '1' },
});
const output = `${run.stdout ?? ''}${run.stderr ?? ''}`;
const code = run.status ?? 1;

if (code !== 0) {
  process.stdout.write(output);
  if (run.error) console.error(run.error.message);
  console.log(`\n✗ "${[command, ...args].join(' ')}" failed (exit code ${code}). Full output above.`);
} else {
  const lines = output.trimEnd().split('\n');
  const hidden = lines.length - KEEP_LINES;
  if (hidden > 0) console.log(`(${hidden} lines hidden because it passed; run it without :brief to see them)`);
  console.log(lines.slice(-KEEP_LINES).join('\n'));
  console.log(`✓ "${[command, ...args].join(' ')}" passed.`);
}
process.exit(code);
