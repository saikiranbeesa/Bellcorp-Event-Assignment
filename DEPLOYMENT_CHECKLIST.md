# 📋 Deployment Checklist

## Pre-Deployment Verification

### Backend Verification
- [ ] All environment variables set correctly in `.env`
- [ ] MongoDB connection tested and working
- [ ] All npm packages installed
- [ ] No console errors when starting server
- [ ] API endpoints tested with Postman/Insomnia
- [ ] CORS configured for frontend URL
- [ ] Password hashing working
- [ ] JWT token generation working
- [ ] Error handling implemented
- [ ] Database indexed properly
- [ ] No hardcoded secrets in code

### Frontend Verification
- [ ] All npm packages installed
- [ ] React Router working correctly
- [ ] Authentication context functioning
- [ ] API service correctly configured
- [ ] All pages render without errors
- [ ] Responsive design tested on mobile
- [ ] Navigation working properly
- [ ] Forms submitting correctly
- [ ] Error messages displaying
- [ ] Loading states implemented
- [ ] No console errors

### Database Verification
- [ ] MongoDB running and accessible
- [ ] Test data seeded successfully
- [ ] Indexes created properly
- [ ] Unique constraints working
- [ ] Relationships between collections valid
- [ ] Backup strategy in place

---

## Environment Setup

### Backend (.env)
```
MONGODB_URI=<PRODUCTION_MONGODB_URL>
JWT_SECRET=<STRONG_SECRET_KEY>
PORT=5000
NODE_ENV=production
CLIENT_URL=<FRONTEND_URL>
```

### Frontend (.env.local - optional)
```
REACT_APP_API_URL=<BACKEND_URL>
```

---

## Deployment Steps

### Step 1: Frontend Deployment (Vercel)

- [ ] Push code to GitHub
- [ ] Go to vercel.com and login
- [ ] Create new project from GitHub
- [ ] Select `client` as root directory
- [ ] Add environment variables if needed
- [ ] Deploy
- [ ] Test deployed frontend URL
- [ ] Verify all pages load
- [ ] Check responsive design

### Step 2: Backend Deployment (Render)

- [ ] Push backend code to GitHub
- [ ] Go to render.com and login
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Add environment variables:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] NODE_ENV=production
  - [ ] CLIENT_URL
- [ ] Deploy
- [ ] Wait for deployment to complete
- [ ] Test health endpoint
- [ ] Check logs for errors

### Step 3: Database Setup (MongoDB Atlas)

- [ ] Create MongoDB Atlas account
- [ ] Create new project
- [ ] Create M0 (free) or M2 (paid) cluster
- [ ] Create database user
- [ ] Whitelist IP addresses
- [ ] Get connection string
- [ ] Update MONGODB_URI in backend
- [ ] Seed production database:
  ```bash
  MONGODB_URI=<atlas_uri> npm run seed
  ```

### Step 4: Connect Frontend to Backend

- [ ] Update API base URL in frontend `src/services/api.js`
- [ ] Update CORS in backend for frontend URL
- [ ] Redeploy frontend with new API URL
- [ ] Test API calls from frontend

---

## Post-Deployment Testing

### API Testing
```bash
# Test backend health
curl https://<backend-url>/health

# Test API endpoints
curl https://<backend-url>/api/events

# Test with auth token if needed
curl -H "Authorization: Bearer <token>" https://<backend-url>/api/auth/me
```

### Frontend Testing
- [ ] Register new account
- [ ] Login with credentials
- [ ] Browse events
- [ ] Search events
- [ ] Filter events
- [ ] Register for event
- [ ] View dashboard
- [ ] Cancel registration
- [ ] Logout and verify redirect

### Performance Testing
- [ ] Lighthouse score > 80
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] No memory leaks

### Security Testing
- [ ] HTTPS enabled
- [ ] No sensitive data in localStorage except token
- [ ] JWT token validation working
- [ ] Protected routes secured
- [ ] CORS properly configured
- [ ] Input validation working

---

## Monitoring & Maintenance

### Backend Monitoring (Render)
- [ ] Check logs regularly
- [ ] Monitor CPU usage
- [ ] Monitor memory usage
- [ ] Monitor database connections
- [ ] Set up error alerts
- [ ] Monitor deployment logs

### Frontend Monitoring (Vercel)
- [ ] Check deployment logs
- [ ] Monitor build success/failure
- [ ] Check performance metrics
- [ ] Monitor error logs

### Database Monitoring (MongoDB Atlas)
- [ ] Check connection pool status
- [ ] Monitor query performance
- [ ] Check disk usage
- [ ] Review backup status
- [ ] Check for slow queries

---

## Troubleshooting Deployment Issues

### Issue: 502 Bad Gateway
**Solution**:
- Check backend logs on Render
- Verify MongoDB connection
- Check environment variables
- Restart backend service

### Issue: CORS Error
**Solution**:
- Update CORS whitelist with frontend URL
- Verify frontend URL matches exactly
- Restart backend service

### Issue: API Timeout
**Solution**:
- Check MongoDB Atlas whitelist
- Verify database connection string
- Check network connectivity
- Increase timeout in frontend

### Issue: Authentication Failing
**Solution**:
- Verify JWT_SECRET is same in all instances
- Check token format in requests
- Verify HTTPS headers
- Clear browser cache and localStorage

### Issue: Database Connection Error
**Solution**:
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials
- Test connection locally first

---

## Rollback Procedure

### Frontend Rollback (Vercel)
- [ ] Go to Vercel dashboard
- [ ] Select deployment to rollback to
- [ ] Click "Promote to Production"
- [ ] Verify previous version is live

### Backend Rollback (Render)
- [ ] Go to Render dashboard
- [ ] View deployment history
- [ ] Redeploy from previous commit
- [ ] Verify services are up

---

## Performance Optimization

### Frontend Optimization
- [ ] Enable gzip compression
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Use lazy loading
- [ ] Implement caching headers

### Backend Optimization
- [ ] Enable response compression
- [ ] Add database indexes
- [ ] Implement caching
- [ ] Use connection pooling
- [ ] Optimize queries

### Database Optimization
- [ ] Create indexes on frequently queried fields
- [ ] Archive old data
- [ ] Optimize data types
- [ ] Monitor slow queries

---

## Security Checklist

- [ ] HTTPS enabled on all URLs
- [ ] Sensitive data not exposed in logs
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] SQL/NoSQL injection protected
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Regular security updates planned

---

## Post-Deployment Communication

- [ ] Notify team of deployment
- [ ] Update deployment documentation
- [ ] Create release notes
- [ ] Communicate any breaking changes
- [ ] Share deployment URLs
- [ ] Provide test credentials if needed

---

## Maintenance Schedule

### Daily
- [ ] Monitor error logs
- [ ] Check application health
- [ ] Verify API response times

### Weekly
- [ ] Review database metrics
- [ ] Check disk usage
- [ ] Review user feedback
- [ ] Monitor security logs

### Monthly
- [ ] Review performance reports
- [ ] Plan maintenance windows
- [ ] Update dependencies
- [ ] Backup data verification
- [ ] Security scanning

---

## Useful Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Best Practices](https://react.dev/)

---

## Support Contacts

- Render Support: support@render.com
- Vercel Support: support@vercel.com
- MongoDB Support: https://support.mongodb.com
- GitHub Support: https://support.github.com

---

**Last Updated**: 2026
**Version**: 1.0.0
