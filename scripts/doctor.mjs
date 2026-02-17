#!/usr/bin/env node
import { execSync } from 'node:child_process';

const REQUIRED_NODE_MAJOR = 20;
const REQUIRED_NPM_MAJOR = 10;

function parseMajor(version) {
  const major = Number.parseInt(version.replace(/^v/, '').split('.')[0], 10);
  return Number.isNaN(major) ? null : major;
}

function run(command) {
  try {
    return execSync(command, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' }).trim();
  } catch (error) {
    return {
      ok: false,
      message: error.stderr?.toString().trim() || error.message
    };
  }
}

const nodeVersion = process.version;
const npmVersionResult = run('npm --version');
const npmVersion = typeof npmVersionResult === 'string' ? npmVersionResult : null;

const checks = [];

const nodeMajor = parseMajor(nodeVersion);
checks.push({
  label: `Node.js version (${nodeVersion})`,
  ok: nodeMajor !== null && nodeMajor >= REQUIRED_NODE_MAJOR,
  hint: `Install Node ${REQUIRED_NODE_MAJOR}+ (recommend using nvm with .nvmrc).`
});

const npmMajor = npmVersion ? parseMajor(npmVersion) : null;
checks.push({
  label: `npm version (${npmVersion ?? 'unavailable'})`,
  ok: npmVersion !== null && npmMajor !== null && npmMajor >= REQUIRED_NPM_MAJOR,
  hint: `Install npm ${REQUIRED_NPM_MAJOR}+ (bundled with modern Node 20 releases).`
});

const registryResult = run('npm ping --silent');
checks.push({
  label: 'npm registry connectivity',
  ok: typeof registryResult === 'string',
  hint:
    'If your environment blocks the registry, use an internal mirror via `npm config set registry <url>` or run inside an allow-listed CI/dev container.'
});

const failed = checks.filter((check) => !check.ok);

console.log('Environment diagnostics for MFG26 PoC');
console.log('--------------------------------------');
for (const check of checks) {
  console.log(`${check.ok ? '✅' : '❌'} ${check.label}`);
  if (!check.ok) {
    console.log(`   ↳ ${check.hint}`);
  }
}

console.log('\nSuggested recovery sequence:');
console.log('1. nvm use || nvm install');
console.log('2. npm config set registry https://registry.npmjs.org/');
console.log('3. npm cache verify');
console.log('4. npm install');

if (failed.length > 0) {
  process.exitCode = 1;
}
