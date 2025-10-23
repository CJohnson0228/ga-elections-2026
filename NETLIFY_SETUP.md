# Netlify Setup Instructions

This project uses Netlify Functions to fetch RSS feeds server-side, avoiding CORS issues.

## Local Development

### 1. Install Netlify CLI globally

```bash
npm install -g netlify-cli
```

### 2. Run the development server with Netlify Functions

Instead of `npm run dev`, use:

```bash
netlify dev
```

This will:
- Start Vite on port 5173
- Start Netlify Functions on port 8888
- Automatically proxy requests to `/.netlify/functions/*`

### 3. Access the app

Open http://localhost:8888 (NOT localhost:5173)

The Netlify CLI will proxy your Vite dev server and make the functions available.

## How It Works

- **RSS Feeds**: The app calls `/.netlify/functions/fetch-rss?url=<RSS_URL>`
- **Netlify Function**: Fetches the RSS feed server-side (no CORS issues)
- **Response**: Returns parsed JSON articles to the frontend
- **Caching**: Articles are cached in localStorage for 30 minutes

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

```bash
# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect the settings from `netlify.toml`
6. Click "Deploy"

## Configuration

All configuration is in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[dev]
  command = "npm run dev"
  port = 5173
  targetPort = 5173
  functionsPort = 8888
```

## Troubleshooting

### "Cannot connect to Netlify Functions"

Make sure you're running `netlify dev` instead of `npm run dev`.

### "RSS feeds not loading"

Check the console - it should show:
```
Fetching RSS for <Feed Name> via Netlify function
```

### "Port already in use"

Kill any process using port 8888 or change `functionsPort` in `netlify.toml`.

## Files Added

- `netlify/functions/fetch-rss.js` - Serverless function to fetch RSS feeds
- `netlify.toml` - Netlify configuration
- Updated `src/services/rssService.ts` - Now calls Netlify function instead of third-party APIs
