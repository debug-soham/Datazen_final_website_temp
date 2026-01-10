# Vercel Deployment Guide for Datazen Website

## ✅ Setup Complete

Your project is now configured for Vercel deployment with Google Sheets integration!

## 🎯 What Was Done

1. ✅ Removed Cloudflare Functions (incompatible with Vercel)
2. ✅ Removed `wrangler.toml` (Cloudflare config)
3. ✅ Created `.env` file with your Google Sheets credentials
4. ✅ Backend already configured to use Google Sheets API

## 🚀 Deploy to Vercel

### Step 1: Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add these three variables.

**Copy the values from your local `.env` file** (they're already configured):

#### GOOGLE_SHEETS_CREDENTIALS
Copy the entire JSON value from your `.env` file (keep it as one line)

#### GOOGLE_SHEETS_ID
Your Google Sheets spreadsheet ID

#### GOOGLE_SHEETS_NAME
The name of your sheet tab (e.g., "Team Registrations")

> **Important:** Never commit actual credentials to GitHub. Use only the values from your local `.env` file.

### Step 4: Deploy
Click "Deploy" and Vercel will build and deploy your app!

## 📋 How It Works

1. User submits registration form → Frontend sends POST to `/api/register`
2. Backend validates data → Saves to Google Sheets
3. Response sent back to user

### Backend Flow:
- [`server/routes.ts`](server/routes.ts) - Handles `/api/register` endpoint
- [`server/storage.ts`](server/storage.ts) - Manages registration logic
- [`server/lib/google-sheets.ts`](server/lib/google-sheets.ts) - Appends data to Google Sheets

## 🧪 Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5000` and test the registration form!

## 🔒 Security Notes

- ✅ `.env` is in `.gitignore` (credentials won't be committed)
- ✅ Use Vercel's environment variables for production
- ✅ Never commit credentials to GitHub

## 📊 Google Sheets Setup

Make sure your Google Sheet has these columns:
| Team Name | College | Year | Team Size | Leader Name | Leader Resume | Email | Phone | Member 2 Name | Member 2 Resume | Member 3 Name | Member 3 Resume | Created At |

## 🐛 Troubleshooting

### If deployment fails:
1. Check all 3 environment variables are set in Vercel
2. Ensure `GOOGLE_SHEETS_CREDENTIALS` is valid JSON (no line breaks except in the private_key)
3. Verify the service account has edit access to your Google Sheet

### If data isn't saving:
1. Check Vercel Function Logs for errors
2. Verify the Google Sheet ID matches your sheet
3. Ensure the sheet tab name is exactly "Team Registrations"

## ✅ Success!

Your website will now:
- Accept team registrations
- Save all data to Google Sheets automatically
- Send success/error messages to users

Enjoy your deployment! 🎉
