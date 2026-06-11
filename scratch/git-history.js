const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCmd(cmd) {
  try {
    console.log(`Running: ${cmd}`);
    const out = execSync(cmd, { encoding: 'utf8', stdio: 'inherit' });
  } catch (err) {
    console.error(`Error executing: ${cmd}`, err.message);
  }
}

// 1. Initialize Git repository
runCmd('git init');

// List of batches of files and their commit messages
const commitBatches = [
  {
    files: ['.gitignore'],
    msg: 'chore: initialize git repository and add .gitignore'
  },
  {
    files: ['package.json', 'package-lock.json', 'pnpm-lock.yaml'],
    msg: 'chore: add package configuration and dependency locks'
  },
  {
    files: ['tsconfig.json', 'components.json'],
    msg: 'chore: add typescript and components configuration'
  },
  {
    files: ['next.config.mjs', 'postcss.config.mjs'],
    msg: 'chore: configure next.config and postcss compiler options'
  },
  {
    files: ['lib/types.ts'],
    msg: 'feat: define core TypeScript interfaces and enums'
  },
  {
    files: ['lib/db.ts', 'lib/api-client.ts', 'lib/utils.ts'],
    msg: 'feat: setup database connection and utils'
  },
  {
    files: ['lib/models/Company.ts'],
    msg: 'feat: add Mongoose Company schema model'
  },
  {
    files: ['lib/models/CacheProvider.ts'],
    msg: 'feat: add Mongoose CacheProvider schema model'
  },
  {
    files: ['lib/models/Server.ts'],
    msg: 'feat: add Mongoose Server schema model'
  },
  {
    files: ['lib/models/Allocation.ts'],
    msg: 'feat: add Mongoose Allocation schema model'
  },
  {
    files: ['lib/seed.ts', 'lib/mock-data.ts'],
    msg: 'feat: implement database seeding logic and mock data'
  },
  {
    files: ['components/ui'],
    msg: 'style: add Base UI primitives and tailwind inputs, selects, and modals'
  },
  {
    files: ['components/layout'],
    msg: 'feat: design dashboard navbar and sidebar layouts'
  },
  {
    files: ['components/shared'],
    msg: 'feat: add page header, status badge, and custom progress indicators'
  },
  {
    files: ['components/forms/company-form.tsx', 'components/forms/cache-provider-form.tsx'],
    msg: 'feat: implement company and cache provider forms'
  },
  {
    files: ['components/forms/server-form.tsx', 'components/forms/allocation-form.tsx'],
    msg: 'feat: implement server and allocation management forms'
  },
  {
    files: ['components/tables'],
    msg: 'feat: implement custom Tailwind data list tables'
  },
  {
    files: ['app/api'],
    msg: 'feat: implement API routes for servers, providers, allocations, and companies'
  },
  {
    files: ['app/(dashboard)', 'app/dashboard', 'app/page.tsx', 'app/layout.tsx', 'app/globals.css'],
    msg: 'feat: construct main dashboard pages, views, and routing'
  },
  {
    files: ['README.md'],
    msg: 'docs: add comprehensive project README documentation'
  }
];

// Execute batches
commitBatches.forEach((batch, idx) => {
  console.log(`\n--- Batch ${idx + 1} / ${commitBatches.length} ---`);
  
  // Add files
  let stagedAny = false;
  batch.files.forEach(file => {
    if (fs.existsSync(file)) {
      runCmd(`git add "${file}"`);
      stagedAny = true;
    } else {
      console.warn(`File/Folder does not exist: ${file}`);
    }
  });
  
  if (stagedAny) {
    runCmd(`git commit -m "${batch.msg}"`);
  } else {
    console.log('No files staged for this batch.');
  }
});

console.log('\n--- Committing any remaining untracked/unstaged files ---');
runCmd('git add .');
try {
  runCmd('git commit -m "chore: include remaining assets and build outputs"');
} catch (e) {
  // If nothing remaining, ignore
}

console.log('\n--- Finalizing branch configuration ---');
runCmd('git branch -M main');
runCmd('git remote add origin https://github.com/awesomemohsin/BD-CacheX.git');

console.log('\n--- Git Initialization and History generation finished ---');
