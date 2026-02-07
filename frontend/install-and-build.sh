#!/bin/bash
echo "Installing dependencies..."

# Remove node_modules if it exists
if [ -d "node_modules" ]; then
  echo "Removing existing node_modules..."
  rm -rf node_modules
fi

# Install dependencies
npm install

if [ $? -eq 0 ]; then
  echo "Dependencies installed successfully!"
else
  echo "Failed to install dependencies."
  exit 1
fi

echo "Running build..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build completed successfully!"
else
  echo "Build failed."
  exit 1
fi