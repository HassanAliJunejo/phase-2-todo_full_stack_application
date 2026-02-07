const { execSync } = require('child_process');
const fs = require('fs');

console.log('Installing dependencies...');

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  // Get dependencies
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  // Combine all dependencies
  const allDeps = [...dependencies, ...devDependencies];
  
  console.log('Dependencies to install:', allDeps.join(', '));
  
  // Install all dependencies
  execSync(`npm install ${allDeps.join(' ')}`, { stdio: 'inherit' });
  
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
}