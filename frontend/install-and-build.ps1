Write-Host "Installing dependencies..."

# Remove node_modules if it exists
if (Test-Path "node_modules") {
    Write-Host "Removing existing node_modules..."
    Remove-Item -Recurse -Force node_modules
}

# Install dependencies
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!"
} else {
    Write-Host "Failed to install dependencies."
    exit 1
}

Write-Host "Running build..."
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!"
} else {
    Write-Host "Build failed."
    exit 1
}