#!/bin/bash

# Create a deployment package for the ScanSmart application
echo "Creating deployment package for ScanSmart..."

# Create a temporary directory for the export
mkdir -p deployment_package

# Copy all necessary files, excluding node_modules, .git, etc.
echo "Copying project files..."
rsync -av --progress . deployment_package \
  --exclude node_modules \
  --exclude .git \
  --exclude deployment_package

# Copy deployment guides
echo "Copying deployment guides..."
cp vercel-deployment-guide.md deployment_package/
cp netlify-deployment-guide.md deployment_package/
cp render-deployment-guide.md deployment_package/

# Create the vercel.json file
echo "Creating Vercel configuration..."
cat > deployment_package/vercel.json << EOL
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "client/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/\$1"
    }
  ]
}
EOL

# Create the render.yaml file
echo "Creating Render configuration..."
cat > deployment_package/render.yaml << EOL
services:
  - type: web
    name: scansmart
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_ENV
        value: production
EOL

# Create a README with instructions
echo "Creating README with deployment instructions..."
cat > deployment_package/README.md << EOL
# ScanSmart Deployment Package

This package contains your ScanSmart application ready for deployment.

## Deployment Options

1. **Render** (Recommended for full-stack): See render-deployment-guide.md
2. **Netlify** (For frontend-only): See netlify-deployment-guide.md
3. **Vercel** (More complex setup): See vercel-deployment-guide.md

## Quick Start

The fastest way to deploy your full application is with Render:

1. Create a GitHub repository with these files
2. Go to render.com and sign up/login
3. Create a new Web Service pointing to your GitHub repository
4. Use the following settings:
   - Build Command: \`npm install && npm run build\`
   - Start Command: \`npm run start\`
   - Environment Variable: NODE_ENV=production

## Need Help?

Refer to the specific deployment guide for your chosen platform.
EOL

# Create a zip file
echo "Creating ZIP archive..."
cd deployment_package
zip -r ../scansmart-deployment.zip .
cd ..

echo "Deployment package created: scansmart-deployment.zip"
echo "You can download this file and deploy to your preferred hosting platform."
echo "See the README and deployment guides inside the package for instructions."