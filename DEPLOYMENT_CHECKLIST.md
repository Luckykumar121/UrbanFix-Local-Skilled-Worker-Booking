# Render Deployment Checklist

## Pre-Deployment Checklist ✅

### Code Preparation

- [ ] All changes committed to GitHub
- [ ] `git push origin main` successful
- [ ] No console errors in local development
- [ ] `npm run build` works without errors
- [ ] Backend starts with `npm start` (not just `npm run dev`)

### Backend Setup

- [ ] `server/package.json` has `"start": "node server.js"` script
- [ ] MongoDB URI obtained from MongoDB Atlas
- [ ] JWT secret generated
- [ ] Email credentials ready (if using email)
- [ ] CORS configured for frontend URL
- [ ] Environment variables identified

### Frontend Setup

- [ ] `vite.config.js` configured correctly
- [ ] API base URL uses `import.meta.env.VITE_API_URL`
- [ ] Build command: `npm run build`
- [ ] Build output in `dist` folder

### Accounts & Services

- [ ] GitHub account with code pushed
- [ ] Render account created
- [ ] MongoDB Atlas account with cluster created
- [ ] `.env.example` file created with all variables

---

## Deployment Steps

### Step 1: Deploy Backend

- [ ] Create Backend Service on Render
- [ ] Set Root Directory: `server`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add all environment variables
- [ ] Note the backend URL (e.g., `https://urbanfix-backend.onrender.com`)

### Step 2: Deploy Frontend

- [ ] Create Static Site on Render
- [ ] Set Root Directory: `client/worker-booking-front`
- [ ] Set Build Command: `npm run build`
- [ ] Set Publish Directory: `dist`
- [ ] Add `VITE_API_URL` environment variable (backend URL + `/api`)
- [ ] Note the frontend URL

### Step 3: Update Backend Configuration

- [ ] Update CORS with frontend URL
- [ ] Update `FRONTEND_URL` environment variable
- [ ] Redeploy backend service
- [ ] Test API endpoints

### Step 4: Verify Deployment

- [ ] Backend loads without errors
- [ ] Frontend loads without errors
- [ ] API calls work from frontend
- [ ] Database operations function correctly
- [ ] Authentication works
- [ ] Email notifications work (if applicable)

---

## Post-Deployment Checklist

### Testing

- [ ] Visit frontend URL
- [ ] Try logging in / registering
- [ ] Create a worker profile
- [ ] Browse all workers
- [ ] Make a booking request
- [ ] Check admin dashboard
- [ ] Test all major features

### Monitoring

- [ ] Check Render Logs for errors
- [ ] Monitor for crashes
- [ ] Check database connectivity
- [ ] Monitor API response times

### Security

- [ ] All secrets in Render dashboard (not committed)
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on Render)
- [ ] Environment variables set correctly

### Optimization

- [ ] Check build size
- [ ] Monitor performance metrics
- [ ] Set up error alerts (optional)

---

## Common Issues & Solutions

### Issue: Application fails to start

```
✓ Check: Environment variables all set
✓ Check: MONGODB_URI is correct
✓ Check: JWT_SECRET is set
✓ Action: Restart service
```

### Issue: Frontend can't connect to backend

```
✓ Check: VITE_API_URL is correct
✓ Check: CORS configured on backend
✓ Check: Backend service is running
✓ Action: Check browser console for errors
```

### Issue: MongoDB connection timeout

```
✓ Check: MongoDB Atlas IP whitelist includes Render
✓ Check: Connection string is correct
✓ Action: Add 0.0.0.0/0 to IP whitelist (temporary)
```

### Issue: Build fails on Render

```
✓ Check: npm run build works locally
✓ Check: All dependencies in package.json
✓ Check: No hardcoded paths or local files
✓ Action: Check build logs in Render dashboard
```

---

## Environment Variables Template

Copy these and fill in values in Render dashboard:

**Backend (server)**

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
FRONTEND_URL=https://urbanfix-frontend.onrender.com
NODE_ENV=production
PORT=5000
```

**Frontend (client/worker-booking-front)**

```
VITE_API_URL=https://urbanfix-backend.onrender.com/api
```

---

## Redeployment After Changes

```bash
# 1. Make your changes locally
# 2. Test everything
git add .
git commit -m "Your changes"
git push origin main

# Render will automatically redeploy both services
# Check Render dashboard for deployment status
```

---

## Useful URLs After Deployment

- **Frontend**: https://urbanfix-frontend.onrender.com
- **Backend API**: https://urbanfix-backend.onrender.com/api
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## Support Links

- 📚 [Render Docs](https://render.com/docs)
- 📚 [MongoDB Docs](https://docs.atlas.mongodb.com)
- 💬 [Render Community](https://community.render.com)

---

**Created on**: June 3, 2026
**Status**: Ready for deployment ✅
