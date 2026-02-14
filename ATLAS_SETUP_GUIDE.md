# ✅ MongoDB Atlas Setup - Step by Step

## Step 1: Create Free Account (1 minute)
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Enter:
   - Email: your email
   - Password: strong password
   - First Name: Your first name
   - Last Name: Your last name
4. Check boxes and click **"Sign Up"**
5. Verify email (check inbox)
6. Complete initial setup

## Step 2: Create Free M0 Cluster (2 minutes)
1. After signup, click **"Create a Deployment"**
2. Choose **"M0 FREE"** tier (free forever for learning)
3. Select Cloud Provider: **AWS** (default is fine)
4. Select Region: Pick one close to you (e.g., us-east-1)
5. Click **"Create Cluster"**
6. ⏱️ Wait 2-3 minutes for deployment...

## Step 3: Create Database User (1 minute)
1. Once cluster is ready, click **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Authentication Method: **Password** (already selected)
4. Username: **admin** (or your choice)
5. Password: Click **"Auto-generate Secure Password"** → **Copy and save it!**
6. User Privileges: **Atlas admin** (for development)
7. Click **"Add User"**

## Step 4: Whitelist Your IP (1 minute)
1. Click **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Two options:
   - **Quick**: Click "Allow Access from Anywhere" (easier, less secure)
   - **Secure**: Enter your IP address
4. For development, **"Allow Access from Anywhere"** is fine
5. Description: type "Local development"
6. Click **"Confirm"**

## Step 5: Get Connection String (1 minute)
1. Go to **"Deployments"** → **"Databases"**
2. Find your cluster, click **"Connect"**
3. Click **"Drivers"**
4. Select **Node.js** version **4.1 or later**
5. You'll see a connection string like:
   ```
   mongodb+srv://admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Copy this entire string**

## Step 6: Update Your .env File
The connection string format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_NAME.mongodb.net/DATABASE_NAME
```

**Replace in the string:**
- `USERNAME` → your database username (e.g., admin)
- `PASSWORD` → your database password (from Step 3)
- `CLUSTER_NAME` → your cluster domain (first part before .mongodb.net)
- Keep `/bellcorp-events` as database name (or change to preference)

**Example:**
```
mongodb+srv://admin:MySecurePassword123@cluster0.abc123def.mongodb.net/bellcorp-events?retryWrites=true&w=majority
```

## Step 7: Test Connection
Back in terminal, from `/server` directory:

```bash
npm run seed
```

If successful, you'll see:
```
✓ MongoDB Connected: cluster0.abc123def.mongodb.net
✓ Created 20 sample events
✓ Database seeding completed successfully
```

---

## ⚠️ Important Notes

- **Never share your connection string** (contains credentials)
- **PASSWORD SPECIAL CHARACTERS**: If your password has special chars, URL encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `:` → `%3A`
  - Example: `pass@word` → `pass%40word`

- **IP Whitelist**: For "Allow Access from Anywhere", Atlas will allow all IPs
  - For production, whitelist only your server IP

- **Free Tier Limits**:
  - 512 MB storage
  - Perfect for testing/development
  - Upgrade anytime if needed

---

## 🆘 Troubleshooting

### "Authentication failed"
- Double-check username and password
- Make sure special characters are URL-encoded
- Try resetting password in MongoDB Atlas

### "Connection timeout"
- Check IP whitelist (Network Access)
- Make sure "Allow Access from Anywhere" is enabled
- Check internet connection

### "Can't find cluster"
- Make sure cluster is fully deployed (check status)
- Refresh page and try again

---

## Next Steps After Setup

1. Update `.env` file with connection string
2. Run: `npm run seed` (from server directory)
3. Start backend: `npm run dev`
4. In another terminal: Start frontend: `npm start`

**Done! 🎉**
