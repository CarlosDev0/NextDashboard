# Google OAuth Credentials Setup Guide

Follow these steps to create Google OAuth credentials for your application:

## Step 1: Go to Google Cloud Console
1. Visit https://console.cloud.google.com/
2. Sign in with your Google account
3. Click on the project dropdown (top-left) and select "New Project"
4. Give your project a name (e.g., "NextDashboard") and click "Create"

## Step 2: Configure OAuth Consent Screen
1. In the left sidebar, go to **APIs & Services** > **OAuth consent screen**
2. Select **External** (for external users) and click "Create"
3. Fill in the required fields:
   - **App name**: NextDashboard (or your preferred name)
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click "Save and Continue"
5. Skip the "Scopes" section (click "Save and Continue")
6. In "Test users", add your Google email address as a test user
   - Click "Add users"
   - Enter your email
   - Click "Save"
7. Click "Save and Continue" to finish

## Step 3: Create OAuth Credentials
https://console.cloud.google.com/auth/clients/795079798700-t7i7b0q3cjut0mfajl59hdet52dld4e7.apps.googleusercontent.com?organizationId=0&project=beaming-set-335222
1. In the left sidebar, go to **APIs & Services** > **Clients**
2. Click "Create Client" and select **Web Application**
3. Select **Web application** as the application type
4. Fill in the details:
   - **Name**: NextDashboard Web Client
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/callback/google`
     - `https://startling-empanada-b120a8.netlify.app/api/auth/callback/google`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://your-production-domain.com`
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

## Step 4: Get Your App ID (Optional for Google+)
1. Go to https://console.cloud.google.com/apis/credentials
2. Your OAuth 2.0 Client ID is visible in the credentials list

## Step 5: Setup InstantDB (for User Whitelist)
1. Visit https://www.instantdb.com/
2. Sign in with your account: Google -> carlossan
3. Create a new app called "NextDashboard"
4. Copy your **App ID** from the dashboard
5. Go to Settings > API Tokens
6. Create a new admin token and copy it
7. In your InstantDB dashboard, go to Schema and create a new collection called `whitelists` with these properties:
   - `email` (string)
   - `name` (string)
   - `role` (string)
   - `createdAt` (number)
8. Add your email to the whitelist with role "admin"

## Important Notes:
- The OAuth consent screen is in "Test" mode, which means only test users you add can sign in
- To make it publicly available, you'll need to verify your app with Google (requires domain ownership)
- For local development, add `localhost:3000` to authorized origins
- After deployment, update the authorized URLs with your production domain
- Without adding your email to the InstantDB whitelist, you won't be able to sign in
