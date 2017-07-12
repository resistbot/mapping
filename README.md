# Mapping the Resistance 

## Installation 

1. Clone the repo

```
git clone git@github.com:resistbot/mapping.git
```

2. Install dependencies 

```
npm install 
```

3. Create a local env file and copy/paste your Rapid Pro API Key. 
```
node setup.js
```

4. Create a DB in MongoDB
```
use resistmap
```

5. Run the Rapid Pro data pull 
```
node bin/pull_rapidpro_data.js
```

6. Start the server!
```
npm start
```
