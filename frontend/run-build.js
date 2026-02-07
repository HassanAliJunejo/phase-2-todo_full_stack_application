const { spawn } = require('child_process');

console.log('Starting build process...');

const buildProcess = spawn('npm', ['run', 'build'], {
  cwd: __dirname,
  stdio: 'inherit'
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('Build completed successfully!');
  } else {
    console.log(`Build failed with code ${code}`);
  }
});