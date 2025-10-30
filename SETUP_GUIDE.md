# Complete Setup Guide for Non-Technical Users
## iPhone 17 Pro Max Availability Checker

This guide will walk you through every step needed to set up an automated system that checks if your desired iPhone 17 Pro Max is available for pickup at nearby Apple Stores.

---

## What This Does

Every 30 minutes, this system automatically:
- Checks Apple Stores near ZIP code 07029
- Looks for two specific iPhones:
  - iPhone 17 Pro Max, Deep Blue, 256GB
  - iPhone 17 Pro Max, Cosmic Orange, 256GB
- Sends you a message when either phone is available for pickup

---

## Prerequisites

You'll need:
1. A computer with internet access
2. A GitHub account (free) - we'll create this together
3. A Discord or Slack account (free) - for receiving notifications

**Time needed**: About 20-30 minutes for first-time setup

---

## Part 1: Create a GitHub Account

**What is GitHub?** It's a website that will run your availability checker automatically in the background, for free.

### Steps:

1. Go to [github.com](https://github.com)
2. Click the **"Sign up"** button in the top-right corner
3. Enter your email address and click **"Continue"**
4. Create a password and click **"Continue"**
5. Choose a username and click **"Continue"**
6. Complete the verification puzzle
7. Check your email for a verification code
8. Enter the code on GitHub
9. You now have a GitHub account!

---

## Part 2: Download the Project Files

### Steps:

1. At the top of this page, look for a green button that says **"Code"**
2. Click the **"Code"** button
3. Click **"Download ZIP"** at the bottom of the menu
4. Your browser will download a file called `iphone-availability-checker-main.zip`
5. Find the downloaded file (usually in your Downloads folder)
6. **Right-click** the ZIP file and select **"Extract All..."** (Windows) or **double-click** it (Mac)
7. A new folder will appear with all the files inside

**What you should see in the folder:**
- A folder called `.github`
- A folder called `scripts`
- A file called `README.md`
- A file called `package.json`
- A file called `SETUP_GUIDE.md` (this guide!)

---

## Part 3: Create Your GitHub Repository

**What is a repository?** Think of it as a project folder on GitHub where your files will live.

### Steps:

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top-right corner
3. Click **"New repository"**
4. Name your repository: `iphone-availability-checker`
5. Make sure **"Public"** is selected (this is required for free GitHub Actions)
6. **Do NOT** check any boxes (no README, no .gitignore, no license)
7. Click the green **"Create repository"** button

You'll see a page with instructions. Keep this page open - we'll use it next.

---

## Part 4: Upload Your Files to GitHub

### Steps:

1. On the repository page you just created, look for the text that says **"uploading an existing file"** (it's a link in the middle of the page)
2. Click **"uploading an existing file"**
3. You'll see a page that says "Drag files here to add them to your repository"
4. Open the folder you extracted in Part 2
5. **Select ALL files and folders** inside (including the `.github` folder)
   - **Windows**: Press `Ctrl + A` to select all
   - **Mac**: Press `Cmd + A` to select all
6. **Drag all the selected files** into the GitHub page (where it says "Drag files here")
7. Wait for all files to upload (you'll see a list of files appear)
8. Scroll down and click the green **"Commit changes"** button

**Important**: Make sure the `.github` folder is uploaded. This folder contains the automation instructions.

---

## Part 5: Set Up Discord Notifications (Recommended)

**Why Discord?** It's the easiest way to receive notifications. You can also use Slack if you prefer.

### Option A: Discord (Easier)

1. **Create a Discord Server** (if you don't have one):
   - Open Discord (download from [discord.com](https://discord.com) if needed)
   - Click the **"+"** button on the left sidebar
   - Click **"Create My Own"**
   - Click **"For me and my friends"**
   - Name it "iPhone Alerts" and click **"Create"**

2. **Create a Webhook**:
   - Right-click your server name at the top
   - Click **"Server Settings"**
   - Click **"Integrations"** in the left menu
   - Click **"Webhooks"**
   - Click **"New Webhook"**
   - Name it "iPhone Checker"
   - Select a channel (like #general)
   - Click **"Copy Webhook URL"** - this is important!
   - Save this URL somewhere safe (like a notepad)
   - Click **"Save Changes"**

### Option B: Slack

1. Go to [api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
2. Click **"Create your Slack app"**
3. Follow Slack's instructions to create an Incoming Webhook
4. Copy the Webhook URL

---

## Part 6: Configure GitHub Secrets

**What are secrets?** These are private settings that tell the system what to check and where to send notifications.

### Steps:

1. Go to your GitHub repository page: `github.com/YOUR-USERNAME/iphone-availability-checker`
2. Click the **"Settings"** tab at the top (far right)
3. In the left sidebar, click **"Secrets and variables"**
4. Click **"Actions"**
5. You'll see a page that says "Actions secrets and variables"

Now we'll add three secrets:

---

### Secret 1: ZIP_CODE

1. Click the green **"New repository secret"** button
2. In the **"Name"** field, type exactly: `ZIP_CODE`
3. In the **"Secret"** field, type: `07029`
4. Click **"Add secret"**

---

### Secret 2: NOTIFICATION_WEBHOOK

1. Click the green **"New repository secret"** button again
2. In the **"Name"** field, type exactly: `NOTIFICATION_WEBHOOK`
3. In the **"Secret"** field, paste the Discord/Slack webhook URL you copied in Part 5
4. Click **"Add secret"**

---

### Secret 3: IPHONE_CONFIGS

**This is the most important secret!** It tells the system which iPhones to check.

**Important Note**: The iPhone 17 Pro Max hasn't been released yet, so we don't know the actual model numbers. You'll need to update this secret when the iPhone 17 launches.

#### For Now (Placeholder):

1. Click the green **"New repository secret"** button again
2. In the **"Name"** field, type exactly: `IPHONE_CONFIGS`
3. In the **"Secret"** field, copy and paste this EXACT text (all on one line):

\`\`\`
[{"name":"Deep Blue 256GB","model":"PLACEHOLDER1","color":"Deep Blue","storage":"256GB"},{"name":"Cosmic Orange 256GB","model":"PLACEHOLDER2","color":"Cosmic Orange","storage":"256GB"}]
\`\`\`

4. Click **"Add secret"**

#### When iPhone 17 Launches (Update This):

When the iPhone 17 Pro Max is released, you'll need to find the real model numbers:

1. Go to [apple.com/shop/buy-iphone](https://www.apple.com/shop/buy-iphone)
2. Select **iPhone 17 Pro Max**
3. Choose **Deep Blue** color and **256GB** storage
4. Select **"No trade-in"**, **"Buy"**, **"Connect to any carrier later"**, **"No AppleCare"**
5. Enter ZIP code **07029**
6. Click **"Check availability"**

**Finding the Model Number** (this is technical but important):

7. **Windows**: Press `F12` on your keyboard
   **Mac**: Press `Cmd + Option + I`
8. A panel will open at the bottom or side of your browser
9. Click the **"Network"** tab at the top of this panel
10. Click **"Check availability"** again on the Apple website
11. In the Network panel, look for a request that contains `pickup-message`
12. Click on it
13. Look for text that says `"parts.0"` followed by something like `"MU773LL/A"`
14. **That code (like MU773LL/A) is your model number!** Write it down.
15. Repeat steps 3-14 for the **Cosmic Orange** color to get the second model number

**Update the Secret**:

16. Go back to GitHub → Your repository → Settings → Secrets and variables → Actions
17. Click on **IPHONE_CONFIGS**
18. Click **"Update secret"**
19. Replace `PLACEHOLDER1` with the Deep Blue model number
20. Replace `PLACEHOLDER2` with the Cosmic Orange model number
21. Click **"Update secret"**

---

## Part 7: Enable GitHub Actions

**What are GitHub Actions?** This is the feature that runs your checker automatically every 30 minutes.

### Steps:

1. Go to your repository page
2. Click the **"Actions"** tab at the top
3. If you see a green button that says **"I understand my workflows, go ahead and enable them"**, click it
4. You should now see a workflow called **"Check iPhone 17 Pro Max Availability"**

**Your automation is now active!** It will run automatically every 30 minutes.

---

## Part 8: Test It Manually (Optional but Recommended)

Let's make sure everything works:

1. Go to the **"Actions"** tab
2. Click on **"Check iPhone 17 Pro Max Availability"** in the left sidebar
3. Click the **"Run workflow"** button on the right (you might need to click the dropdown first)
4. Click the green **"Run workflow"** button
5. Wait about 30 seconds
6. Refresh the page
7. You should see a new workflow run appear
8. Click on it to see the details
9. Click on **"check-availability"** to see the logs

**What to expect**:
- If the model numbers are still placeholders, you might see an error - that's okay!
- Once you update with real model numbers, you should see store availability information
- Check your Discord/Slack channel for a notification

---

## Part 9: Understanding Notifications

When an iPhone becomes available, you'll receive a message like this:

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

You'll get **separate notifications** for each iPhone configuration.

---

## Troubleshooting

### I'm not receiving notifications

**Check these things:**

1. **Verify your webhook URL**:
   - Go to Settings → Secrets and variables → Actions
   - Make sure `NOTIFICATION_WEBHOOK` is set correctly
   - The URL should start with `https://discord.com/api/webhooks/` or `https://hooks.slack.com/`

2. **Check if the workflow is running**:
   - Go to the Actions tab
   - Look for recent runs (should be every 30 minutes)
   - Click on a run to see if there are any errors

3. **Test your Discord webhook**:
   - Go to your Discord server settings
   - Go to Integrations → Webhooks
   - Click on your webhook
   - Click "Send Test Message"
   - If this doesn't work, your webhook might be broken - create a new one

### The workflow isn't running automatically

1. Make sure your repository is **Public** (not Private)
2. Go to Settings → Actions → General
3. Make sure "Allow all actions and reusable workflows" is selected
4. Scroll down and make sure "Read and write permissions" is selected under "Workflow permissions"

### I see errors in the Actions logs

**Common errors:**

- **"Model not found"**: The model number is incorrect or the iPhone hasn't launched yet
- **"Invalid JSON"**: Your `IPHONE_CONFIGS` secret has a typo - check for missing quotes or commas
- **"Webhook failed"**: Your webhook URL is incorrect

### How do I change the check frequency?

1. Go to your repository
2. Click on the `.github` folder
3. Click on the `workflows` folder
4. Click on `check-iphone-availability.yml`
5. Click the pencil icon (Edit this file)
6. Find the line that says `cron: '*/30 * * * *'`
7. Change it to:
   - `'*/15 * * * *'` for every 15 minutes
   - `'*/60 * * * *'` for every hour
   - `'0 * * * *'` for every hour on the hour
8. Scroll down and click "Commit changes"

**Note**: More frequent checks use more of your free GitHub Actions minutes (2,000/month on free plan).

---

## Important Notes

### GitHub Actions Limits

- **Free accounts**: 2,000 minutes per month
- **Your usage**: Checking 2 iPhones every 30 minutes uses about 96 minutes/month
- **You're well within the free limit!**

### When to Update

You MUST update the `IPHONE_CONFIGS` secret with real model numbers when:
- The iPhone 17 Pro Max is officially released
- Apple opens pre-orders
- You want to check availability

Until then, the system won't find any results (because the placeholders aren't real products).

### Privacy & Security

- Your secrets (webhook URL, model numbers) are private and encrypted
- Only you can see them
- The workflow runs on GitHub's servers, not your computer
- This is completely safe and follows GitHub's terms of service

### Stopping the Checker

If you want to stop the automatic checks:

1. Go to your repository
2. Click Settings
3. Click Actions → General
4. Select "Disable actions"
5. Click Save

---

## Summary Checklist

Before the iPhone 17 launches:
- [ ] Created GitHub account
- [ ] Created repository
- [ ] Uploaded all files
- [ ] Set up Discord/Slack webhook
- [ ] Added ZIP_CODE secret (07029)
- [ ] Added NOTIFICATION_WEBHOOK secret
- [ ] Added IPHONE_CONFIGS secret (with placeholders)
- [ ] Enabled GitHub Actions
- [ ] Tested manually (optional)

When iPhone 17 launches:
- [ ] Found Deep Blue 256GB model number
- [ ] Found Cosmic Orange 256GB model number
- [ ] Updated IPHONE_CONFIGS secret with real model numbers
- [ ] Tested manually to confirm it works

---

## Need Help?

If you get stuck:

1. **Check the Actions logs**: Go to Actions tab → Click on a workflow run → Look for error messages
2. **Re-read this guide**: Make sure you followed every step exactly
3. **Check your secrets**: Settings → Secrets and variables → Actions - make sure all three secrets are there
4. **Test your webhook**: Send a test message from Discord/Slack settings

---

## What's Next?

Once everything is set up:

1. **Wait for iPhone 17 launch** (expected September 2025)
2. **Update model numbers** following Part 6 instructions
3. **Relax** - the system will automatically check every 30 minutes
4. **Act fast** when you get a notification - iPhone stock goes quickly!

Good luck getting your iPhone 17 Pro Max! 🎉
