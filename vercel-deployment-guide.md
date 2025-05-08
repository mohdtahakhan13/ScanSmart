# ScanSmart Vercel Deployment Guide

Follow these steps to successfully deploy your ScanSmart application on Vercel.

## Step 1: Prepare Your Codebase

1. Download your project from Replit by clicking on the three dots menu at the top of the file explorer and selecting "Download as zip"

2. Extract the zip file to your local computer

3. Create a new `vercel.json` file in the root directory with the following content:

```json
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
      "dest": "client/dist/$1"
    }
  ]
}
```

4. Edit the `package.json` file to update the build script:

```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build --outDir=client/dist && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push",
  "vercel-build": "npm run build"
}
```

5. Update the vite.config.ts file to ensure it builds to the correct directory:

```typescript
// In vite.config.ts
export default defineConfig({
  // Other config options...
  build: {
    outDir: 'client/dist',
  },
  // Rest of your config...
});
```

## Step 2: Set Up a GitHub Repository

1. Create a new repository on GitHub
2. Initialize your local directory as a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [YOUR_GITHUB_REPO_URL]
git push -u origin main
```

## Step 3: Deploy on Vercel

1. Sign up or log in to Vercel (https://vercel.com)
2. Click "Add New" > "Project"
3. Connect your GitHub account and select your repository
4. Configure the project:
   - Set the build directory to: `client/dist`
   - Add the following Environment Variables:
     - `NODE_ENV`: `production`
5. Click "Deploy"

## Troubleshooting

If you encounter issues with the deployment, try the following:

1. Check the Vercel deployment logs for specific errors
2. Ensure all file paths in your imports are using the correct case sensitivity
3. If you're still having issues, try using the "Override" build command in Vercel's deployment settings:
   ```
   npm run build && cd client && npm run build
   ```

## Additional Notes

- For local development, you can continue using Replit's environment
- If you make changes to your application, push them to GitHub and Vercel will automatically redeploy
- If you need to use a custom domain, you can configure it in the Vercel project settings