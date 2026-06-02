# Render Deployment Guide for UrbanFix

This guide will help you deploy your full-stack UrbanFix application to Render in production.

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - Create a free cluster at [mongodb.com/cloud](https://mongodb.com/cloud)
4. **Gmail App Password** - For email notifications (optional)

---

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add remote
git remote add origin https://github.com/your-username/urbanfix.git

# Push code
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create a free account
3. Create a new cluster
4. Get your connection string:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/urbanfix
   ```
5. Keep this string safe - you'll need it for Render

---

## Step 3: Generate JWT Secret

Create a strong JWT secret:

```bash
# On Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (Get-Random))) | ForEach-Object { $_ -replace '[/+=]', '' }

# Or on Mac/Linux
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 4: Deploy to Render

### Method 1: Using render.yaml (Recommended)

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the branch (usually `main`)
5. Click **"Deploy"**
6. Render will automatically read `render.yaml` and deploy both services

### Method 2: Manual Deployment

#### Deploy Backend (API Service)

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `urbanfix-backend`
   - **Runtime**: `Node`
   - **Region**: Select closest to your users
   - **Plan**: Free or Paid
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. Click **"Advanced"** and add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your generated JWT secret
   - `EMAIL_USER`: Your email (for notifications)
   - `EMAIL_PASS`: Your email password/app password
   - `FRONTEND_URL`: Will update after frontend is deployed

5. Click **"Create Web Service"**

#### Deploy Frontend (Static Site)

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `urbanfix-frontend`
   - **Runtime**: `npm`
   - **Region**: Same as backend
   - **Root Directory**: `client/worker-booking-front`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   - `VITE_API_URL`: Will be something like `https://urbanfix-backend.onrender.com/api`

5. Click **"Create Static Site"**

---

## Step 5: Configure Environment Variables

After services are created, add environment variables in Render:

### Backend Environment Variables

```
MONGODB_URI=mongodb+srv://username:password@...
JWT_SECRET=your_strong_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://urbanfix-frontend.onrender.com
NODE_ENV=production
```

### Frontend Environment Variables

```
VITE_API_URL=https://urbanfix-backend.onrender.com/api
```

---

## Step 6: Update Backend CORS

Update your backend's CORS configuration to accept requests from your Render frontend:

**In `server/server.js`:**

```javascript
const cors = require("cors");

const corsOptions = {
  origin: [
    "https://urbanfix-frontend.onrender.com", // Render frontend
    "http://localhost:5173", // Local development
    "http://localhost:3000", // Alternative local
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
```

---

## Step 7: Update Frontend API Configuration

**In `client/worker-booking-front/src/services/` (or wherever you make API calls):**

```javascript
// Get API URL from environment
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

## Step 8: Verify Deployment

After deployment completes:

1. **Check Backend**: `https://urbanfix-backend.onrender.com/api/health` (if endpoint exists)
2. **Check Frontend**: `https://urbanfix-frontend.onrender.com`
3. **Test API Connection**: Make a test API call from the frontend

### Check Logs

- Go to Service → Logs
- Look for any errors
- Most common: Database connection issues, wrong environment variables

---

## Troubleshooting

### Issue: "Application failed to start"

**Solution:**

- Check Environment Variables in Render dashboard
- Verify `MONGODB_URI` is correct
- Check `server.js` logs

### Issue: Frontend can't connect to backend

**Solution:**

- Check `VITE_API_URL` environment variable
- Verify CORS configuration in backend
- Check if both services are deployed and running

### Issue: MongoDB connection timeout

**Solution:**

- Add your Render IP to MongoDB Atlas whitelist
- In MongoDB Atlas: Network Access → Add Current IP → Or add 0.0.0.0/0 (less secure)

### Issue: Build fails

**Solution:**

- Check build logs in Render
- Ensure `npm run build` works locally: `npm run build`
- Check for missing dependencies

### Issue: Env variables not loading

**Solution:**

- Render requires exact key names
- Use `.env` file locally, but set variables in Render dashboard
- Restart services after adding env variables

---

## Redeploy Your App

### Auto-redeploy on Push (Default)

Your app automatically redeploys when you push to GitHub

### Manual Redeploy

1. Go to Service → Manual Deploy → Deploy latest commit

### Redeploy from Branch

```bash
git add .
git commit -m "Your changes"
git push origin main
# Render will auto-redeploy
```

---

## Monitoring & Maintenance

### View Logs

- Service → Logs (Real-time logs)
- Check for errors, warnings, crashes

### Monitor Performance

- Service → Metrics
- CPU usage, Memory, Disk I/O

### Update Dependencies

```bash
# Update locally
npm update

# Or upgrade major versions
npm install -g npm-check-updates
ncu -u

# Test locally before pushing
npm run dev
npm run build

# Push to GitHub (auto-redeploys on Render)
git push origin main
```

---

## Useful Commands

```bash
# Test build locally before deploying
npm run build
npm run preview

# Check for errors
npm run lint

# Update all packages
npm update

# Clear Render cache (go to Settings → Clear Cache)
```

---

## Security Best Practices

1. ✅ **Keep secrets in Render dashboard** - Never commit `.env` files
2. ✅ **Use strong JWT secrets** - Generate random 32+ character strings
3. ✅ **Enable HTTPS** - Render does this automatically
4. ✅ **Validate input** - Use Joi/express-validator on backend
5. ✅ **Rate limiting** - Add express-rate-limit to prevent abuse
6. ✅ **CORS whitelist** - Only allow your domain

---

## Next Steps

1. Deploy to Render using `render.yaml`
2. Test all functionality
3. Set up monitoring and alerts
4. Configure custom domain (optional)
5. Set up automated backups for MongoDB

---

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)

---

**Happy Deploying! 🚀**
