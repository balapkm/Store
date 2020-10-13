# Store App

Store App is managing the store information.

  - Add the Store information
  - List the store information
  - Update the store information
  - Delete the store information
  - Search the store information

# Demo!

![Demo](../master/docs/demo.gif)

# API Docs

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/64f0ec9f938782838df7#?env%5BDEVELOPMENT%5D=W3sia2V5IjoiZW5kX3BvaW50IiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvIiwiZW5hYmxlZCI6dHJ1ZX1d)

  - /store - fecth list of store by using id
  - /store/create - create the store
  - /store/update - update the store information
  - /store/search - search the store based on name
  - /store/delete - delete the store information

Authorization
   
  - Username - admin
  - Password - admin@123

# Front End Docs

I used the react framework as front end. 

**Plugins** 
  
  - Redux - state management
  - Redux-saga - Handle the async effects in our state management
  - Boostrap - Designing framework
  - React Hook form - Handle the forms and validation
  - Jquery - Controll the DOM
  - Typescript - Data type checking and handle oops concept
  - React Router DOM - Handle the navigation from one page into another.

**Folders** 
    
  Inside the *views/src/*
  - actions - Redux actions are available here.
  - components - list of component are available here.
  - config - front end configuration are available here
  - reducers - Redux redux function are available here. 
  - sagas - Redux saga folder for async process.
  - services - Common function of the project
  - store - redux store files are available here.
 
**Installation**

  cd src/views
  yarn install

**Run Development**

  yarn start

**Production**

  yarn build

# Back End Docs

I used the Node js and Mysql in back end.

**Plugins** 
  
  - Typescript - Data type checking and handle oops concept
  - ajv - Handling the API request validation 
  - cookie-parser - Parse the cookies
  - cors - Handle the CORS / Allow the headers and origin
  - express-basic-auth - Used for basic autheciation
  - express-rate-limit - limit the request from users
  - morgan - Logging purpose
  - helmet - Set secure response headers
  - nodejs-base64 - Do base64 encode and decode the request
  - winston - Logging purpose
  - sequelize - ORM concept for mysql

**Folders** 
    
  - logs - each logs are write here
  - env - environment configuration 

  Inside the *src/*

  - json_schemas - List of json schema are available here. 
  - middlewares - List of middleware of express routing
  - models - sequelize models are available here.  
  - routes - list of routes for API
  - shared - list of common function,config in that folder
  - views - React framework

**Installation**

  npm install

**Run Development**

  npm run start:dev

**Production Build**

  npm start
