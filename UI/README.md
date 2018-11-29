#DEVELOPMENT


##Clone this repository

* Go to UI folder
```
cd UI
```

##To install dependencies, run:
```
npm install
```

##To deploy on local server
* Pre-requisite, you must have an apache/nginx server installed on your computer
* To access, the backend from the frontend, you must change the proxy. Open package.json, change:
```
"proxy": "http://localhost:{local-server-port}/{project-folder-name}/UI"
```
Where local-server-port is the port where you've launched your apache server.
Where project-folder-name is the folder in which you cloned the repository

* To serve the website, run
```
npm run start
```

* To continuously watch for changes in your sass files, run
```
npm run sass
```

##To build a production version
```
npm run build
```
  


