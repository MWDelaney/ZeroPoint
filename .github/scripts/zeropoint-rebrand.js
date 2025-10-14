/**
 * ZeroPoint Template Rebranding Script
 * Simple setup script to customize the template for a new project.
 */

import { existsSync, unlinkSync, readFileSync, writeFileSync, readdirSync, statSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { join, extname } from 'path';

/**
 * Cross-platform helper to detect the operating system
 * @returns {string} 'windows', 'darwin', or 'linux'
 */
function getOS() {
  return process.platform === 'win32' ? 'windows' : process.platform;
}

/**
 * Cross-platform file search and replace function
 * Replaces Unix find/sed commands with pure Node.js implementation
 * @param {string} search - Text to search for (case-sensitive)
 * @param {string} replace - Text to replace with
 */
function replaceInFilesNative(search, replace) {
  const targetExtensions = ['.md', '.json', '.js', '.njk', '.yml', '.toml'];
  const excludeDirs = ['node_modules', '.git'];

  function processDirectory(dir) {
    try {
      const items = readdirSync(dir);

      for (const item of items) {
        const fullPath = join(dir, item);

        // Skip excluded directories
        if (excludeDirs.includes(item)) continue;

        try {
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            processDirectory(fullPath);
          } else if (stat.isFile() && targetExtensions.includes(extname(item))) {
            // Process file
            try {
              const content = readFileSync(fullPath, 'utf8');
              const newContent = content.replace(new RegExp(escapeRegExp(search), 'g'), replace);

              if (content !== newContent) {
                writeFileSync(fullPath, newContent, 'utf8');
              }
            } catch (fileError) {
              console.warn(`Could not process file ${fullPath}: ${fileError.message}`);
            }
          }
        } catch (statError) {
          console.warn(`Could not stat ${fullPath}: ${statError.message}`);
        }
      }
    } catch (dirError) {
      console.warn(`Could not read directory ${dir}: ${dirError.message}`);
    }
  }

  processDirectory('.');
}

/**
 * Escapes special regex characters in a string
 * @param {string} string - String to escape
 * @returns {string} Escaped string safe for use in regex
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Prompts user for input with optional default value
 * @param {string} question - The question to ask
 * @param {string} defaultValue - Default value if user presses enter
 * @returns {Promise<string>} User's response or default value
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
 * Extracts git author name and repository name from git config
 * Falls back to sensible defaults if git info is unavailable
 * @returns {Object} Object with author and repoName properties
 */
function getGitInfo() {
  try {
    // Get git author from global config
    const gitAuthor = execSync('git config user.name', { encoding: 'utf8' }).trim();
    // Get remote origin URL and extract repo name
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);

    return {
      author: gitAuthor || 'username',
      repoName: match ? match[2] : 'my-website'
    };
  } catch {
    // Return defaults if git commands fail
    return { author: 'username', repoName: 'my-website' };
  }
}

/**
 * Performs case-sensitive find and replace across project files
 * Uses native Node.js for cross-platform compatibility instead of Unix commands
 * @param {string} search - Text to search for (case-sensitive)
 * @param {string} replace - Text to replace with
 */
function replaceInFiles(search, replace) {
  const os = getOS();

  // Use native Node.js implementation for better cross-platform support
  if (os === 'windows') {
    replaceInFilesNative(search, replace);
  } else {
    // Keep Unix approach for Unix systems for performance
    try {
      // Find relevant files and perform sed replacement with backup
      execSync(`find . -type f \\( -name "*.md" -o -name "*.json" -o -name "*.js" -o -name "*.njk" -o -name "*.yml" -o -name "*.toml" \\) -not -path "./node_modules/*" -not -path "./.git/*" -exec sed -i.bak "s/${escapeRegExp(search)}/${replace}/g" {} + 2>/dev/null || true`);
      // Clean up backup files created by sed
      execSync(`find . -name "*.bak" -not -path "./node_modules/*" -not -path "./.git/*" -delete 2>/dev/null || true`);
    } catch (error) {
      // Fallback to native implementation if Unix commands fail
      console.warn(`Unix commands failed, falling back to native implementation: ${error.message}`);
      replaceInFilesNative(search, replace);
    }
  }
}

/**
 * Main rebranding function - orchestrates the entire process
 * Checks for template marker, gathers user input, performs replacements, and cleans up
 */
async function rebrand() {
  // Check if running in CI environment (GitHub Actions)
  const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

  // Exit early if already rebranded (no .template file)
  if (!existsSync('.template')) {
    if (isCI) {
      console.log('⚠️ Template already rebranded, skipping...');
    }
    process.exit(0);
  }

  // Safety check - ensure we're working with a ZeroPoint template
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  if (packageJson.name !== 'ZeroPoint') {
    // Clean up template marker if this isn't a ZeroPoint template
    unlinkSync('.template');
    if (isCI) {
      console.log('⚠️ Not a ZeroPoint template, skipping...');
    }
    process.exit(0);
  }

  console.log('🪐 Welcome to ZeroPoint! Let\'s customize this for your project.\n');

  // Get git information for defaults
  const gitInfo = getGitInfo();

  let projectName, author, description, proceed;

  if (isCI) {
    // In CI: use git defaults and proceed automatically
    projectName = gitInfo.repoName;
    author = gitInfo.author;
    description = '';
    proceed = 'y';

    console.log(`Using defaults for CI:`);
    console.log(`- Project name: ${projectName}`);
    console.log(`- Author: ${author}`);
    console.log(`- Description: (empty)`);
  } else {
    // Interactive mode: ask user for input
    projectName = await askQuestion('Project name?', gitInfo.repoName);
    author = await askQuestion('Your name/username?', gitInfo.author);
    description = await askQuestion('Project description (optional)?');
    proceed = await askQuestion('Ready to rebrand? (y/n)', 'y');
  }

  // Exit if user doesn't want to proceed
  if (!['y', 'yes'].includes(proceed.toLowerCase())) {
    console.log('Cancelled. Run npm run dev again to retry.');
    process.exit(0);
  }

  console.log('\n🔄 Updating files...');

  // Perform text replacements across all project files (case-sensitive)
  replaceInFiles('ZeroPoint', projectName.replace(/\s+/g, '')); // Remove spaces from project name
  replaceInFiles('MWDelaney', author); // Replace default author
  replaceInFiles('zeropoint', projectName.toLowerCase().replace(/\s+/g, '-')); // Lowercase with hyphens

  // Update package.json with new details
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  if (description) pkg.description = description;
  delete pkg.scripts['pre🪐']; // Remove the rebranding script from package.json
  writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

  // Handle README files - backup current and use template version
  if (existsSync('README.md')) {
    try {
      copyFileSync('README.md', 'README.template.md'); // Backup current README
    } catch (error) {
      console.warn(`Could not backup README.md: ${error.message}`);
    }
  }
  if (existsSync('README.ZeroPoint.md')) {
    try {
      copyFileSync('README.ZeroPoint.md', 'README.md'); // Use ZeroPoint README as new README
    } catch (error) {
      console.warn(`Could not copy README.ZeroPoint.md: ${error.message}`);
    }
  }

  // Clean up template marker file
  unlinkSync('.template');
  console.log('✅ Rebranding complete! Starting development server...\n');
}

// Run the rebranding process
await rebrand();
