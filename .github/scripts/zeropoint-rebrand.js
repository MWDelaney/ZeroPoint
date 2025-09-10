/**
 * ZeroPoint Template Rebranding Script
 * Declarative configuration with simple implementation.
 */

import { existsSync, unlinkSync, readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { createInterface } from 'readline';

// Declarative configuration - all rebranding behavior defined as data
const CONFIG = {
  markers: {
    templateFile: '.template',
    originalName: 'ZeroPoint'
  },

  prompts: [
    { key: 'projectName', question: 'Project name?', gitSource: 'repoName' },
    { key: 'author', question: 'Your name/username?', gitSource: 'gitAuthor' },
    { key: 'description', question: 'Project description (optional)?', optional: true },
    { key: 'proceed', question: 'Ready to rebrand? (y/n)', defaultValue: 'y', validation: 'confirmation' }
  ],

  replacements: [
    { search: 'ZeroPoint', replace: 'projectName' },
    { search: 'MWDelaney', replace: 'author' },
    { search: 'zeropoint', replace: 'projectName', transform: 'kebabCase' }
  ],

  fileOperations: [
    { type: 'updateJson', file: 'package.json', updates: { description: 'description' }, condition: 'description' },
    { type: 'copy', from: 'README.md', to: 'README.template.md' },
    { type: 'copy', from: 'README.ZeroPoint.md', to: 'README.md' }
  ],

  findOptions: {
    fileTypes: ['*.md', '*.json', '*.js', '*.njk', '*.yml', '*.toml'],
    excludePaths: ['./node_modules/*', './.git/*']
  }
};

/**
 * Detects Git information from the current repository
 */
function detectGitInfo() {
  try {
    const gitAuthor = execSync('git config user.name', { encoding: 'utf8' }).trim() || 'username';
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);

    return {
      gitAuthor: gitAuthor === 'username' && match ? match[1] : gitAuthor,
      repoName: match ? match[2] : 'my-website'
    };
  } catch {
    console.warn('Could not detect git info, using defaults');
    return { gitAuthor: 'username', repoName: 'my-website' };
  }
}

/**
 * Prompts user for input with default value
 */
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

/**
 * Collects answers for all configured prompts
 */
async function collectAnswers(prompts, gitInfo) {
  const answers = {};

  for (const prompt of prompts) {
    const defaultValue = prompt.gitSource ? gitInfo[prompt.gitSource] : prompt.defaultValue || '';
    const answer = await askQuestion(prompt.question, defaultValue);

    // Apply validation
    if (prompt.validation === 'confirmation' && !['y', 'yes'].includes(answer.toLowerCase())) {
      console.log('Cancelled. Run npm run dev again to retry.');
      process.exit(0);
    }

    answers[prompt.key] = answer;
  }

  return answers;
}

/**
 * Performs find and replace across all relevant files
 */
function replaceInAllFiles(search, replace, findOptions) {
  try {
    const fileTypePattern = findOptions.fileTypes.map(type => `-name "${type}"`).join(' -o ');
    const excludePattern = findOptions.excludePaths.map(path => `-not -path "${path}"`).join(' ');

    execSync(`find . -type f \\( ${fileTypePattern} \\) ${excludePattern} -exec sed -i.bak "s/${search}/${replace}/g" {} + 2>/dev/null || true`);
    execSync(`find . -name "*.bak" ${excludePattern} -delete 2>/dev/null || true`);
  } catch (error) {
    console.warn(`Could not replace ${search}: ${error.message}`);
  }
}

/**
 * Executes all configured replacements
 */
function executeReplacements(replacements, answers, findOptions) {
  console.log('\n🔄 Updating files...');

  replacements.forEach(replacement => {
    let replaceValue = answers[replacement.replace];

    // Apply transform if specified
    if (replacement.transform === 'kebabCase') {
      replaceValue = replaceValue.toLowerCase().replace(/\s+/g, '-');
    }

    replaceInAllFiles(replacement.search, replaceValue, findOptions);
  });
}

/**
 * Executes all configured file operations
 */
function executeFileOperations(operations, answers) {
  operations.forEach(operation => {
    try {
      // Skip if condition not met
      if (operation.condition && !answers[operation.condition]) {
        return;
      }

      switch (operation.type) {
        case 'updateJson': {
          const content = JSON.parse(readFileSync(operation.file, 'utf8'));
          Object.entries(operation.updates).forEach(([key, answerKey]) => {
            if (answers[answerKey]) {
              content[key] = answers[answerKey];
            }
          });
          writeFileSync(operation.file, JSON.stringify(content, null, 2) + '\n', 'utf8');
          break;
        }

        case 'copy': {
          if (existsSync(operation.from)) {
            execSync(`cp "${operation.from}" "${operation.to}"`);
          }
          break;
        }
      }
    } catch (error) {
      console.warn(`Could not perform ${operation.type} operation: ${error.message}`);
    }
  });
}

/**
 * Main rebranding function - orchestrates the declarative configuration
 */
async function rebrand() {
  // Early exit if already rebranded
  if (!existsSync(CONFIG.markers.templateFile)) {
    process.exit(0);
  }

  // Safety check
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  if (packageJson.name !== CONFIG.markers.originalName) {
    unlinkSync(CONFIG.markers.templateFile);
    process.exit(0);
  }

  console.log('🪐 Welcome to ZeroPoint! Let\'s customize this for your project.\n');

  // Execute configuration-driven workflow
  const gitInfo = detectGitInfo();
  const answers = await collectAnswers(CONFIG.prompts, gitInfo);

  executeReplacements(CONFIG.replacements, answers, CONFIG.findOptions);
  executeFileOperations(CONFIG.fileOperations, answers);

  // Clean up
  unlinkSync(CONFIG.markers.templateFile);
  console.log('✅ Rebranding complete! Starting development server...\n');
}

// Run the rebranding
await rebrand();
