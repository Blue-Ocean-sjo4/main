# mongo atlas
[Mongo Atlas](https://www.mongodb.com/cloud/atlas)
## Spin up server
1. Start free or Log in
2. Create a New Project
3. Name your project
4. Create Project
5. Build a Cluster
6. Create a Cluster (make sure it's a Shared Cluster)
7. Pick a Cloud Provider & Region
  - The provider shouldn't matter. I chose one that had servers closest to me
  - Everything else should be default
8. Wait for the cluster to spin up

## Create database user
1. Go to Security > Database Access
  - left hand side
2. Click New Database User
3. I went with the Password Authentication Method
  - Save your username and password
  - Database User Privileges: Read and write to any database
  - Restrict Access to Specific Clusters/Data Lakes: Off
  - Temporary User: Off
4. Click Add User

## Connect Mongoose to Mongo Atlas
1. Go to Data Storage > Clusters
2. Click Connect
3. Whitelist IP address(es)
  - I chose Allow Access from Anywhere
  - reason being that I have a username and password
4. Click Choose a Connection
5. Click on Connect using MongoDB Compass
  - This will give you the connection string
6. Update the DB_IP in config.js
  - DB_IP: '<USERNAME>:<PASSWORD>@<SERVER_ADDRESS>'
7. Update the Mongoose connection string in database/index.js
```
mongoose.connect(
  `mongodb+srv://${DB_IP}/blueocean`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      authSource: 'admin'
    }
  })
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.log('connection fails'));
```