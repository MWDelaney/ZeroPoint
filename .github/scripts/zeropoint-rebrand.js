/**
 * ZeroPoint Template Rebranding Script
 * A smaller, cross-platform script for renaming template values.
 */

import { existsSync, readFileSync, writeFileSync, readdirSync, statSync, copyFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { join, extname } from 'path';

const TARGET_EXTENSIONS = ['.md', '.json', '.js', '.njk', '.yml', '.toml'];
const EXCLUDE_DIRS = new Set(['node_modules', '.git']);
const TEMPLATE_OWNER = 'mwdelaney';
const TEMPLATE_REPO = 'zeropoint';
const TEMPLATE_NAME = 'ZeroPoint';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceInFiles(search, replace) {
  const regex = new RegExp(escapeRegExp(search), 'g');

  function walk(dir) {
    for (const item of readdirSync(dir)) {
      if (EXCLUDE_DIRS.has(item)) continue;
      const path = join(dir, item);
      const stat = statSync(path);

      if (stat.isDirectory()) {
        walk(path);
        continue;
      }

      if (!TARGET_EXTENSIONS.includes(extname(item))) continue;
      const content = readFileSync(path, 'utf8');
      const updated = content.replace(regex, replace);
      if (updated !== content) writeFileSync(path, updated, 'utf8');
    }
  }

  walk('.');
}

function askQuestion(label, defaultValue = '') {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    const prompt = defaultValue ? `${label} (${defaultValue}): ` : `${label}: `;
    rl.question(prompt, answer => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

function getGitInfo() {
  try {
    const author = execSync('git config user.name', { encoding: 'utf8' }).trim() || null;
    const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remote.match(/[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
    const repoOwner = match ? match[1] : 'username';
    const repoName = match ? match[2] : 'my-website';
    return {
      author: author || repoOwner,
      repoOwner,
      repoName
    };
  } catch {
    return { author: 'username', repoOwner: 'username', repoName: 'my-website' };
  }
}

async function rebrand() {
  const args = process.argv.slice(2);
  const isCI = args.includes('--ci') || process.env.CI === 'true' || process.env.CI === '1' || !process.stdin.isTTY;
  const envProjectName = process.env.REBRAND_PROJECT_NAME || '';
  const envAuthor = process.env.REBRAND_AUTHOR || '';
  const envDescription = process.env.REBRAND_DESCRIPTION || '';

  if (!existsSync('.template')) {
    if (isCI) console.log('⚠️ Template already rebranded, skipping...');
    process.exit(0);
  }

  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  if (packageJson.name !== TEMPLATE_NAME) {
    unlinkSync('.template');
    if (isCI) console.log(`⚠️ Not a ${TEMPLATE_NAME} template, skipping...`);
    process.exit(0);
  }

  console.log('🪐 Welcome to ZeroPoint! Let\'s customize this for your project.\n');

  const gitInfo = getGitInfo();
  const projectName = isCI
    ? envProjectName || gitInfo.repoName
    : await askQuestion('Project name?', envProjectName || gitInfo.repoName);
  const author = isCI
    ? envAuthor || gitInfo.repoOwner
    : await askQuestion('Your name/username?', envAuthor || gitInfo.author);
  const description = isCI
    ? envDescription
    : await askQuestion('Project description (optional)?', envDescription);
  const proceed = isCI
    ? 'y'
    : await askQuestion('Ready to rebrand? (y/n)', 'y');

  if (!['y', 'yes'].includes(proceed.toLowerCase())) {
    console.log('Cancelled. Run npm run dev again to retry.');
    process.exit(0);
  }

  console.log('\n🔄 Updating files...');
  const safeName = projectName.replace(/\s+/g, '');
  const slugName = projectName.toLowerCase().replace(/\s+/g, '-');

  replaceInFiles(TEMPLATE_NAME, safeName);
  replaceInFiles(TEMPLATE_OWNER, author);
  replaceInFiles(TEMPLATE_REPO, slugName);

  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  if (description) pkg.description = description;
  writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  if (existsSync('README.md')) copyFileSync('README.md', 'README.template.md');
  if (existsSync('README.ZeroPoint.md')) copyFileSync('README.ZeroPoint.md', 'README.md');

  unlinkSync('.template');
  console.log('✅ Rebranding complete! Starting development server...\n');
}

rebrand().catch(err => {
  console.error(err);
  process.exit(1);
});
