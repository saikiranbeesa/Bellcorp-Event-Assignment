# 🚀 Deployment Guide: Render + Netlify

## Part 1: Deploy Backend to Render

### Step 1: Prepare Your Repository
Your code is already pushed to GitHub, which is great!

Repository: `https://github.com/saikiranbeesa/Bellcorp-Event-Assignment.git`

### Step 2: Create Render Account
1. Go to **https://render.com**
2. Click **"Sign Up"**
3. Choose **"GitHub"** to sign up with GitHub
4. Click **"Authorize render"** to give access to your repositories
5. Complete signup

### Step 3: Create Web Service on Render
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Under "Connect a repository", search for **"Bellcorp-Event-Assignment"**
4. Click **"Connect"** button
5. Fill in deployment details:
   - **Name**: `bellcorp-event-server` (or your preferred name)
   - **Environment**: Select **Node**
   - **Region**: Select closest to your location
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### Step 4: Add Environment Variables
1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add these variables:

```
MONGODB_URI = mongodb+srv://saikiranbeesa_db_user:A5iCqEPpKmeoAHzg@cluster0.ppgwaqn.mongodb.net/bellcorp-events?appName=Cluster0

JWT_SECRET = your_strong_secret_key_change_this (e.g., bellcorp_jwt_secret_2026_secure_key)

PORT = 5000

NODE_ENV = production

CLIENT_URL = https://bellcorp-event.netlify.app (update this after deploying frontend)
```

⚠️ **Important**: Use a STRONG JWT_SECRET in production (not your local one)

### Step 5: Deploy
1. Click **"Create Web Service"** button
2. ⏱️ Wait 3-5 minutes for deployment
3. Once deployed, you'll get a URL like: `https://bellcorp-event-server.onrender.com`
4. **Save this URL** - you'll need it for frontend

### Step 6: Test Backend Deployment
```bash
curl https://bellcorp-event-server.onrender.com/health
```

You should see:
```json
{"message":"Server is running"}
```

✅ **Backend is deployed!**

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Update Backend URL in Frontend
1. Go to `client/src/services/api.js`
2. Find this line:
   ```javascript
   const api = axios.create({
     baseURL: 'http://localhost:5000/api',
   ```
3. Change to your Render URL:
   ```javascript
   const api = axios.create({
     baseURL: 'https://bellcorp-event-server.onrender.com/api',
   ```
4. Save and commit to GitHub:
   ```bash
   git add .
   git commit -m "Update API URL for Render deployment"
   git push
   ```

### Step 2: Create Netlify Account
1. Go to **https://netlify.com**
2. Click **"Sign Up"**
3. Choose **"GitHub"** (recommended)
4. Authorize Netlify to access your GitHub account

### Step 3: Deploy Frontend
1. Click **"Import an existing project"**
2. Select **"GitHub"**
3. Search for **"Bellcorp-Event-Assignment"**
4. Click **"Import"**
5. Configure build settings:
   - **Base Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `client/build`
   - Click **"Deploy site"**

⏱️ Wait 2-3 minutes for deployment...

### Step 4: Get Your Netlify URL
After deployment, you'll get a URL like:
```
https://bellcorp-event.netlify.app
```

The exact URL Netlify generates might be different - save your actual URL!

### Step 5: Update Backend CORS (Important!)
1. Go back to Render dashboard
2. Select your backend service
3. Go to **"Environment"**
4. Update **CLIENT_URL** to your Netlify URL:
   ```
   CLIENT_URL = https://bellcorp-event.netlify.app
   ```
5. Click **"Save Changes"**
6. Service will auto-redeploy (2-3 minutes)

---

## Part 3: Verify Deployment

### Test Frontend
1. Open your Netlify URL: `https://bellcorp-event.netlify.app`
2. You should see the Bellcorp Events homepage
3. Try to:
   - Register a new account
   - Login
   - Browse events
   - Register for an event
   - View dashboard

### Test API Connection
Check browser DevTools (F12):
- Open **Network** tab
- Try any action (register, login, browse events)
- You should see API calls to your Render backend
- Status should be **200** or **201** (success)

### Common Issues & Solutions

**Issue: CORS Error**
```
Access to XMLHttpRequest blocked by CORS
```
**Solution**:
- Make sure `CLIENT_URL` in Render environment matches your Netlify URL exactly
- Wait a few minutes for Render to restart

**Issue: 502 Bad Gateway (Backend)**
**Solution**:
- Wait 2-3 minutes for Render to fully start
- Check Render logs for errors
- Verify MONGODB_URI is correct

**Issue: API calls timing out**
**Solution**:
- Check if Render service is running (green status)
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Try REST call directly with curl

**Issue: Image not loading / 404 errors**
**Solution**:
- Ensure base directory is set to `client` in Netlify
- Check that build command is `npm run build`

---

## 📋 Deployment Checklist

### Before Deploying
- [ ] Code is pushed to GitHub
- [ ] No hardcoded secrets in code
- [ ] MongoDB Atlas connection works locally
- [ ] Backend works with `npm run dev`
- [ ] Frontend works with `npm start`

### During Backend Deployment (Render)
- [ ] Repository connected
- [ ] Build command: `npm install`
- [ ] Start command: `node server.js`
- [ ] All env variables added
- [ ] Deployment successful (green status)

### During Frontend Deployment (Netlify)
- [ ] Base directory: `client`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `client/build`
- [ ] API URL updated to Render URL
- [ ] Deployment successful (green status)

### After Deployment
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Can register/login
- [ ] Can browse events
- [ ] API calls working (check Network tab)
- [ ] No CORS errors

---

## 🔄 Environment Variables Summary

### Render (Backend)
```
MONGODB_URI=mongodb+srv://saikiranbeesa_db_user:A5iCqEPpKmeoAHzg@cluster0.ppgwaqn.mongodb.net/bellcorp-events
JWT_SECRET=your_strong_production_secret
PORT=5000
NODE_ENV=production
CLIENT_URL=https://bellcorp-event.netlify.app
```

### Netlify (Frontend)
```
No environment variables needed!
(Backend URL is hardcoded in api.js)
```

---

## 📊 Deployment URLs

Once deployed, you'll have:
- **Backend URL**: `https://bellcorp-event-server.onrender.com`
- **Frontend URL**: `https://bellcorp-event.netlify.app`
- **API Endpoint**: `https://bellcorp-event-server.onrender.com/api`

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Render Web Services](https://render.com/docs/web-services)
- [Netlify Deployment](https://docs.netlify.com/site-deploys/create-deploys/)

---

## 💡 Pro Tips

1. **Keep your backend URL saved** - you'll need it for frontend
2. **Update CORS after getting Netlify URL** - CORS is a common issue
3. **Check build logs** - both Render and Netlify show detailed logs if something fails
4. **Test locally first** - make sure everything works before deploying
5. **Monitor deployments** - both services show deployment status and logs

---

## 🚀 You're Ready to Deploy!

Follow these steps in order:
1. ✅ Create Render account
2. ✅ Deploy backend to Render
3. ✅ Get Render backend URL
4. ✅ Update frontend API URL
5. ✅ Create Netlify account
6. ✅ Deploy frontend to Netlify
7. ✅ Get Netlify frontend URL
8. ✅ Update Render CLIENT_URL
9. ✅ Test both URLs

**Estimated time: 15-20 minutes** ⏱️

Let me know if you need help with any step! 🎉
