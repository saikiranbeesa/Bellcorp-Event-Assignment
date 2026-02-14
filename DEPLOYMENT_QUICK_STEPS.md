# 🚀 Quick Deployment Steps for Render + Netlify

## 📝 Checklist: Follow These 9 Steps

### Phase 1: Backend Deployment (Render) - 5 minutes

- [ ] **Step 1**: Go to https://render.com → Sign up with GitHub
- [ ] **Step 2**: Click "New +" → Select "Web Service"
- [ ] **Step 3**: Connect your GitHub repository "Bellcorp-Event-Assignment"
- [ ] **Step 4**: Fill in settings:
  - Name: `bellcorp-event-server`
  - Build Command: `npm install`
  - Start Command: `node server.js`
- [ ] **Step 5**: Add Environment Variables:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: A strong secret key
  - `PORT`: 5000
  - `NODE_ENV`: production
  - `CLIENT_URL`: Leave blank for now (update later)
- [ ] **Step 6**: Click "Create Web Service" and wait for deployment ⏳
- [ ] **Step 7**: Once deployed, copy your backend URL:
  ```
  https://bellcorp-event-server.onrender.com
  ```

### Phase 2: Frontend Deployment (Netlify) - 3 minutes

- [ ] **Step 8a**: Update `client/src/services/api.js`
  - Change line with `baseURL` from `http://localhost:5000/api` to:
  ```javascript
  baseURL: 'https://bellcorp-event-server.onrender.com/api'
  ```
  - Save and commit: `git add . && git commit -m "Update API URL" && git push`

- [ ] **Step 8b**: Go to https://netlify.com → Sign up with GitHub

- [ ] **Step 9a**: Click "Import an existing project" → Select GitHub → Choose "Bellcorp-Event-Assignment"

- [ ] **Step 9b**: Configure build settings:
  - Base Directory: `client`
  - Build Command: `npm run build`
  - Publish Directory: `client/build`
  - Click "Deploy site" ⏳

- [ ] **Step 9c**: Wait for deployment and copy your frontend URL:
  ```
  https://bellcorp-event.netlify.app
  ```

### Phase 3: Connect Backend & Frontend - 2 minutes

- [ ] **Step 10**: Go back to Render dashboard → Your backend service → Environment
- [ ] **Step 11**: Update `CLIENT_URL` to your Netlify URL:
  ```
  CLIENT_URL = https://bellcorp-event.netlify.app
  ```
- [ ] **Step 12**: Click "Save Changes" and wait for auto-redeploy (2-3 min)

---

## ✅ Verification

### Test Backend
```bash
curl https://bellcorp-event-server.onrender.com/health
# Should return: {"message":"Server is running"}
```

### Test Frontend
1. Open: https://bellcorp-event.netlify.app
2. Try to register, login, browse events
3. Open DevTools (F12) → Network tab
4. API calls should go to Render backend (not localhost!)

---

## 🔑 Your Credentials to Keep Safe

```
GitHub: saikiranbeesa/Bellcorp-Event-Assignment
Render Backend URL: https://bellcorp-event-server.onrender.com
Netlify Frontend URL: https://bellcorp-event.netlify.app
MongoDB: atlas.mongodb.com (Atlas login)
```

---

## 💥 Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| CORS Error | Update `CLIENT_URL` in Render, wait 2 min |
| 502 Bad Gateway | Wait 3 min for Render to start, check logs |
| API calls failing | Verify API URL in `client/src/services/api.js` |
| Build failing | Check Netlify build logs (usually missing package.json in client/) |
| Site not loading | Clear browser cache, wait for Netlify deployment |

---

## 📞 Help Links

- **Render Issues**: Check Render dashboard logs (click on service)
- **Netlify Issues**: Check Netlify build logs (click "Deploys")
- **MongoDB Issues**: Check MongoDB Atlas dashboard
- **CORS Issues**: Verify exact URL match in Render CLIENT_URL

---

## 🎉 Once Everything is Deployed

You can:
- ✅ Access at: https://bellcorp-event.netlify.app
- ✅ Register new users
- ✅ Login securely
- ✅ Browse events from database
- ✅ Register for events
- ✅ View dashboard
- ✅ Share link with others
- ✅ Everything works 16/24 hours!

**Estimated total time: 15-20 minutes**

---

**See DEPLOYMENT_RENDER_NETLIFY.md for detailed step-by-step guide!**
