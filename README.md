# STOCKY CHAT

## Lets begin

_The following instructions can get the project running on your environment._


### Before

_Follow this steps to be able of see the project running on your local environment._


First, download and install [node.js](https://nodejs.org/en/) 

Install express

```
npm install express --save
```

Install react

```
npm install -g create-react-app
```

Finally the sequelize command line interface

```
npm install -g sequelize-cli
```

Finally the node module for sequelize

```
npm install --save sequelize
```

Now the database, which is [postgresql](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

We need a postgresql module to get connected with node

```
npm install --save pg pg-hstore
```

Finally lets install a node process monitor for the development environment

```
npm install -g nodemon
```



### Then, when the environment is prepared


_First, on each folder lets install the node dependencies_

```
npm install
```

_Before setup postgres, lets create a user_

_for the development environment the default user is root and the default password is 1234_

```
psql postgres postgres
CREATE ROLE root WITH LOGIN PASSWORD '1234';
ALTER ROLE root CREATEDB;
```

_To configure the database run the following scripts depending on your operative system_

_For a windows system run the batch file in the stocky-chat-api folder_

```
reboot-database.bat
```
_For a unix based system run the shell script in the stocky-chat-api folder_

```
reboot-database.sh
```
_In order to run the application, we need to start the api server, the bot server and the react server_

_In the stocky-chat-api folder run_

```
nodemon
```

_In the stocky-chat-bot folder run_

```
nodemon
```

_In the stocky-chat-web folder run_

```
npm start
```

_Go to [http://localhost:3000/](http://localhost:3000/)_

## Author

* **Jhonatan Torres** - [jhonatan247](https://github.com/jhonatan247)
