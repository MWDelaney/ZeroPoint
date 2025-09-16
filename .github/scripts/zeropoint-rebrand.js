/**
 * ZeroPoint Template Rebranding Script
 * Simple setup script to customize the template for a new project.
 */

import { existsSync, unlinkSync, readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { createInterface } from 'readline';

async function askQuestion(question, defaultValue = '') {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    rl.question(prompt, answer => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

function getGitInfo() {
  try {
    const gitAuthor = execSync('git config user.name', { encoding: 'utf8' }).trim();
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);

    return {
      author: gitAuthor || 'username',
      repoName: match ? match[2] : 'my-website'
    };
  } catch {
    return { author: 'username', repoName: 'my-website' };
  }
}

function replaceInFiles(search, replace) {
  try {
    execSync(`find . -type f \\( -name "*.md" -o -name "*.json" -o -name "*.js" -o -name "*.njk" -o -name "*.yml" -o -name "*.toml" \\) -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak "s/${search}/${replace}/g" {} + 2>/dev/null || true`);
    execSync(`find . -name "*.bak" -not -path "./node_modules/*" -not -path "./.git/*" -delete 2>/dev/null || true`);
  } catch (error) {
    console.warn(`Could not replace ${search}: ${error.message}`);
  }
}

async function rebrand() {
  // Exit if already rebranded
  if (!existsSync('.template')) {
    process.exit(0);
  }

  // Safety check - make sure we're in a ZeroPoint template
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  if (packageJson.name !== 'ZeroPoint') {
    unlinkSync('.template');
    process.exit(0);
  }

  console.log('🪐 Welcome to ZeroPoint! Let\'s customize this for your project.\n');

  // Get user input
  const gitInfo = getGitInfo();
  const projectName = await askQuestion('Project name?', gitInfo.repoName);
  const author = await askQuestion('Your name/username?', gitInfo.author);
  const description = await askQuestion('Project description (optional)?');
  const proceed = await askQuestion('Ready to rebrand? (y/n)', 'y');

  if (!['y', 'yes'].includes(proceed.toLowerCase())) {
    console.log('Cancelled. Run npm run dev again to retry.');
    process.exit(0);
  }

  console.log('\n🔄 Updating files...');

  // Replace text in files
  // Replace all occurrences of 'ZeroPoint' with the project name, with spaces removed
  replaceInFiles('ZeroPoint', projectName.replace(/\s+/g, ''));
  replaceInFiles('MWDelaney', author);
  replaceInFiles('zeropoint', projectName.toLowerCase().replace(/\\s+/g, '-'));

  // Update package.json
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  if (description) pkg.description = description;
  delete pkg.scripts['pre🪐']; // Remove the rebranding script
  writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

  // Copy README files
  if (existsSync('README.md')) {
    execSync('cp README.md README.template.md');
  }
  if (existsSync('README.ZeroPoint.md')) {
    execSync('cp README.ZeroPoint.md README.md');
  }

  // Clean up
  unlinkSync('.template');
  console.log('✅ Rebranding complete! Starting development server...\n');
}

await rebrand();
