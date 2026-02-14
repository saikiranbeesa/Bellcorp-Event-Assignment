# Quick MongoDB Atlas Setup (2 minutes)

## Steps:

### 1. Create MongoDB Atlas Account
- Go to: https://www.mongodb.com/cloud/atlas
- Click "Sign Up"
- Create account with email/password
- Skip additional info and click "Create Organization"

### 2. Create Free Cluster
- Click "Create a Deployment"
- Select "M0 FREE" tier
- Select region closest to you (or default)
- Click "Create Deployment"
- Wait 2-3 minutes for cluster to deploy

### 3. Create Database User
- Click "Database Access" (left sidebar)
- Click "Add New Database User"
- Username: `admin`
- Password: (generate secure password and save it!)
- Click "Add User"

### 4. Whitelist IP
- Click "Network Access" (left sidebar)
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (or add 0.0.0.0/0)
- Click "Confirm"

### 5. Get Connection String
- Go to "Deployments" → "Databases"
- Click "Connect" on your cluster
- Select "Drivers" → "Node.js"
- Copy connection string that looks like:
  ```
  mongodb+srv://admin:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
  ```

### 6. Update .env File
Edit `server/.env`:
```
MONGODB_URI=mongodb+srv://saikiranbeesa_db_user:A5iCqEPpKmeoAHzg@cluster0.ppgwaqn.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Replace:
- `admin` with your username
- `YOUR_PASSWORD` with your database user password
- `YOUR_CLUSTER` with your cluster domain (first part before .mongodb.net)

### 7. Test Connection
```bash
cd server
npm run seed
```

---

## Alternative: Install MongoDB Locally

If you prefer local MongoDB:

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Follow setup wizard
4. Start MongoDB:
   ```bash
   mongod
   ```
5. Keep terminal open while using app

### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```
