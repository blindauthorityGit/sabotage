import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const [tool, ...args] = process.argv.slice(2);
const entrypoints = {
  next: new URL('../node_modules/next/dist/bin/next', import.meta.url),
  sanity: new URL('../node_modules/sanity/bin/sanity', import.meta.url),
};

if (!tool || !entrypoints[tool]) {
  throw new Error('Usage: node scripts/run-cli.mjs <next|sanity> <arguments...>');
}

const [major, minor] = process.versions.node.split('.').map(Number);
const supportsSystemCa = major > 24 || (major === 24 && minor >= 6) || (major === 23 && minor >= 9) || (major === 22 && minor >= 15);
const env = {...process.env};

if (process.platform === 'win32' && supportsSystemCa && !env.NODE_OPTIONS?.includes('--use-system-ca')) {
  env.NODE_OPTIONS = [env.NODE_OPTIONS, '--use-system-ca'].filter(Boolean).join(' ');
}

const child = spawn(process.execPath, [fileURLToPath(entrypoints[tool]), ...args], {
  env,
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
