# ScanSmart Netlify Deployment Guide

This guide will help you deploy the frontend portion of ScanSmart to Netlify, which is simpler than deploying the full-stack app.

## Step 1: Prepare Your Frontend Code

1. Download your project from Replit by clicking on the three dots menu at the top of the file explorer and selecting "Download as zip"

2. Extract the zip file to your local computer

3. Create a new `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build:client"
  publish = "client/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

4. Create a separate package.json file for the client directory:

```json
{
  "name": "scansmart-client",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.75.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "jsqr": "^1.4.0",
    "lucide-react": "^0.453.0",
    "next-themes": "^0.4.6",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.56.3",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "vaul": "^1.1.2",
    "wouter": "^3.7.0",
    "zod": "^3.24.4",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@replit/vite-plugin-cartographer": "^0.1.2",
    "@replit/vite-plugin-runtime-error-modal": "^0.0.3",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "typescript": "5.6.3",
    "vite": "^5.4.14"
  }
}
```

5. Create a mock API setup in `client/src/lib/mockApi.ts`:

```typescript
// Sample mock data
const mockData = {
  store: {
    id: 1,
    name: "GreenMart",
    branch: "Downtown Branch",
    qrCode: "store:1:GreenMart:Downtown",
    layout: {
      sections: [
        { id: "produce", name: "Produce", color: "bg-green-100", position: { x: 0, y: 0, width: 33, height: 67 } },
        { id: "bakery", name: "Bakery", color: "bg-yellow-100", position: { x: 33, y: 0, width: 33, height: 67 } },
        { id: "dairy", name: "Dairy", color: "bg-blue-100", position: { x: 67, y: 0, width: 33, height: 67 } },
        { id: "beverages", name: "Beverages", color: "bg-purple-100", position: { x: 0, y: 67, width: 50, height: 33 } },
        { id: "snacks", name: "Snacks", color: "bg-red-100", position: { x: 50, y: 67, width: 50, height: 33 } }
      ]
    }
  },
  recommendedProducts: [
    // Copy product objects from server/storage.ts
  ],
  productByBarcode: {
    // Map of barcode to product objects
  }
};

// Update the apiRequest function in queryClient.ts to handle mock data
export async function apiRequest(method, url, data) {
  // For demo/deployment purposes, return mock data
  if (url.startsWith('/api/store')) {
    return { 
      ok: true, 
      json: async () => mockData.store 
    };
  }
  
  if (url.startsWith('/api/products/recommended')) {
    return { 
      ok: true, 
      json: async () => mockData.recommendedProducts 
    };
  }
  
  if (url.startsWith('/api/products/barcode/')) {
    const barcode = url.split('/').pop();
    return { 
      ok: true, 
      json: async () => mockData.productByBarcode[barcode] 
    };
  }
  
  // Default return
  return { 
    ok: true, 
    json: async () => ({}) 
  };
}
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

## Step 3: Deploy on Netlify

1. Sign up or log in to Netlify (https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub account and select your repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `client/dist`
5. Click "Deploy site"

## Step 4: Configure Continuous Deployment

1. Any changes pushed to your GitHub repository will automatically trigger a new deployment on Netlify
2. You can view build logs and configure additional settings in the Netlify dashboard

## Important Notes

1. This deployment is for the frontend only. The backend functionality (Express API) will be simulated with mock data.
2. To fully deploy both frontend and backend, consider using Render, Railway, or a similar platform that supports Node.js backends.

## Using Your Custom Domain

1. In the Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to connect your domain name