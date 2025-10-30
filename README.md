# iPhone 17 Pro Max Availability Checker

Automated GitHub Action that checks iPhone 17 Pro Max availability at Apple Stores every 30 minutes and sends notifications when stock is available.

## Features

- 🔄 Runs automatically every 30 minutes via GitHub Actions
- 📍 Checks availability at Apple Stores near your location
- 🔔 Sends notifications via Discord/Slack webhook
- 📊 Lists all stores with availability status
- ⚡ Can be triggered manually for immediate checks
- 🎨 Supports tracking multiple iPhone configurations simultaneously

## Setup Instructions

### 1. Fork/Clone this Repository

Fork this repository to your GitHub account or clone it to create your own.

### 2. Configure GitHub Secrets

Go to your repository Settings → Secrets and variables → Actions, and add these secrets:

- **`ZIP_CODE`** (Required): Your ZIP code to search for nearby Apple Stores
  - Example: `07029`

- **`IPHONE_CONFIGS`** (Required): JSON array of iPhone configurations to track
  - Example for tracking two iPhones:
  \`\`\`json
  [
    {
      "name": "Deep Blue 256GB",
      "model": "MU773LL/A",
      "color": "Deep Blue",
      "storage": "256GB"
    },
    {
      "name": "Cosmic Orange 256GB",
      "model": "MU774LL/A",
      "color": "Cosmic Orange",
      "storage": "256GB"
    }
  ]
  \`\`\`
  - **Important**: Remove all line breaks and format as a single line when adding to GitHub Secrets
  - Single line format: `[{"name":"Deep Blue 256GB","model":"MU773LL/A","color":"Deep Blue","storage":"256GB"},{"name":"Cosmic Orange 256GB","model":"MU774LL/A","color":"Cosmic Orange","storage":"256GB"}]`

- **`NOTIFICATION_WEBHOOK`** (Optional): Discord or Slack webhook URL for notifications
  - Discord: Server Settings → Integrations → Webhooks → New Webhook
  - Slack: Create an Incoming Webhook app
  - Each iPhone configuration will send separate notifications

### 3. Finding the Product Model Number

When the iPhone 17 Pro Max launches:

1. Go to [apple.com](https://www.apple.com/shop/buy-iphone)
2. Select iPhone 17 Pro Max
3. Choose your configuration (storage, color)
4. Open browser DevTools (F12) → Network tab
5. Click "Check availability"
6. Look for the API request to `pickup-message`
7. Find the `parts.0` parameter - that's your model number
8. Repeat for each color/configuration you want to track

### 4. Your Specific Configuration

For your setup (ZIP: 07029):
- **iPhone 1**: Deep Blue, 256GB, No trade-in, Buy, Connect later, No AppleCare
- **iPhone 2**: Cosmic Orange, 256GB, No trade-in, Buy, Connect later, No AppleCare

Once you find the model numbers for these configurations, update the `IPHONE_CONFIGS` secret with the actual model numbers.

### 5. Enable GitHub Actions

1. Go to the "Actions" tab in your repository
2. Enable workflows if prompted
3. The workflow will run automatically every 30 minutes

### 6. Manual Trigger (Optional)

You can manually trigger a check:
1. Go to Actions → Check iPhone 17 Pro Max Availability
2. Click "Run workflow"

## How It Works

1. **Scheduled Execution**: GitHub Actions runs the workflow every 30 minutes using a cron schedule
2. **API Check**: The script queries Apple's retail availability API for each iPhone configuration
3. **Parse Results**: Extracts store information and availability status for each model
4. **Notification**: Sends separate formatted messages to your webhook for each configuration if stock is available

## Notification Format

Each iPhone configuration sends its own notification:

\`\`\`
📱 iPhone 17 Pro Max - Deep Blue 256GB
Color: Deep Blue
Storage: 256GB
Model: MU773LL/A
Location: 07029
Time: 1/30/2025, 3:30:00 PM
==================================================

✅ AVAILABLE (2 stores):
  • Apple Short Hills - Short Hills, NJ
    Available for pickup today
    Distance: 2.1 miles

  • Apple Willowbrook - Wayne, NJ
    Available for pickup today
    Distance: 5.3 miles

❌ UNAVAILABLE (3 stores):
  • Apple Garden State Plaza - Paramus, NJ
  • Apple Bridgewater - Bridgewater, NJ
  • Apple Menlo Park - Edison, NJ
\`\`\`

## Customization

### Change Check Frequency

Edit `.github/workflows/check-iphone-availability.yml`:

\`\`\`yaml
schedule:
  - cron: '*/15 * * * *'  # Every 15 minutes
  - cron: '0 * * * *'     # Every hour
  - cron: '0 */2 * * *'   # Every 2 hours
\`\`\`

### Always Send Notifications

Set the `ALWAYS_NOTIFY` secret to `true` to receive notifications even when no stock is available.

### Add or Remove iPhone Configurations

To track additional iPhones or remove configurations:
1. Go to Settings → Secrets and variables → Actions
2. Edit the `IPHONE_CONFIGS` secret
3. Add or remove configuration objects from the JSON array
4. Each configuration will be checked independently

## Troubleshooting

- **No notifications**: Check that your webhook URL is correct and the secret is set
- **API errors**: Apple may rate-limit requests; consider increasing the interval
- **Wrong stores**: Verify your ZIP_CODE secret is correct
- **No results**: The product model number may be incorrect or the iPhone 17 hasn't launched yet
- **JSON parsing error**: Ensure `IPHONE_CONFIGS` is valid JSON with no line breaks

## Notes

- GitHub Actions has usage limits on free accounts (2,000 minutes/month)
- Each run takes ~30 seconds per configuration, so checking 2 iPhones every 30 minutes uses ~96 minutes/month
- Apple's API structure may change; updates may be needed
- This is for personal use only; respect Apple's terms of service
- The script adds a 2-second delay between checking different configurations to avoid rate limiting

## License

MIT License - Feel free to modify and use as needed!
