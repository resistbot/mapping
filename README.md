# Mapping the Resistance 

## Installation 

### Clone the repo

```
git clone git@github.com:resistbot/mapping.git
```

### Install dependencies 

```
npm install 
```

### Create a local env file and copy/paste your Rapid Pro API Key. 
```
node setup.js
```

### Create a DB in MongoDB
```
use resistmap
```

### Run the Rapid Pro data pull 
```
node bin/pull_rapidpro_data.js
```

### Start the server!
```
npm start
```
