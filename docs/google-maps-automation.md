# Google Maps Stats Automation

This system automatically scrapes and updates your Google Maps contribution statistics.

## How It Works

### 1. **Scraping Script** (`scripts/update-maps-cache.mjs`)
- Fetches your Google Maps contributor profile page
- Uses regex patterns to extract statistics (points, photos, views, reviews)
- Falls back to cached data if scraping fails
- Updates both JSON and TypeScript cache files

### 2. **Cache System**
- **JSON Cache**: `src/data/google-maps-stats.json` - Raw data storage
- **TypeScript Cache**: `src/utils/googleMapsCache.ts` - Type-safe access for the app

### 3. **Build Integration**
- The `npm run build` command automatically fetches fresh stats before building
- Stats are cached for 1 hour to avoid rate limiting during development

### 4. **GitHub Actions Automation**
- **Schedule**: Runs daily at 6 AM UTC
- **Manual**: Can be triggered manually from GitHub Actions tab
- **Auto-commit**: Commits updated stats back to the repository
- **Auto-deploy**: Triggers a website rebuild when stats change

## Manual Usage

### Fetch Stats Manually
```bash
npm run fetch-maps-stats
```

### Build with Fresh Stats
```bash
npm run build
```

### Development Mode
In development, the system uses cached data to avoid repeated scraping.

## Fallback Strategy

The system has multiple fallback layers:

1. **Live Scraping** (during build)
2. **Cached Data** (from previous successful scrape)
3. **Mock Data** (hardcoded fallback values)

This ensures your site always displays some statistics, even if scraping fails.

## Monitoring

### Check Last Update
The `lastUpdated` field in the cache shows when stats were last fetched successfully.

### GitHub Actions Logs
Check the "Update Google Maps Stats" workflow in your GitHub repository's Actions tab to see scraping results.

### Local Testing
Run the scraper locally to test:
```bash
node scripts/update-maps-cache.mjs
```

## Troubleshooting

### Stats Not Updating
1. Check GitHub Actions logs for errors
2. Verify your Google Maps profile is public
3. Test the scraper locally
4. Check if Google changed their HTML structure

### Rate Limiting
If you encounter rate limiting:
1. The system includes a 1-hour cache to prevent excessive requests
2. GitHub Actions runs only once daily
3. Manual builds use cached data when possible

### Scraping Failures
The regex patterns may need updates if Google changes their page structure. Common patterns to look for:
- Points: `(\d{1,3}(?:,\d{3})*)\s*points`
- Photos: `(\d{1,3}(?:,\d{3})*)\s*photos`
- Views: `(\d{1,3}(?:,\d{3})*(?:\.\d+)?[KMB]?)\s*views`
- Reviews: `(\d{1,3}(?:,\d{3})*)\s*reviews`

## Privacy & Terms of Service

- This scraper accesses only public information from your Google Maps profile
- Be mindful of Google's Terms of Service
- The scraper uses respectful delays and caching to minimize requests
- All scraped data stays within your own repository

## Configuration

### Change User ID
Update the `USER_ID` constant in `scripts/update-maps-cache.mjs`

### Change Schedule
Modify the cron expression in `.github/workflows/update-google-maps-stats.yml`

### Disable Automation
Remove or comment out the GitHub Actions workflow file to disable automatic updates.
