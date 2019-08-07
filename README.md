# Order Management System
Small application written in NodeJS+Angular to demonstrate order management system.

### Tech Stack
- Node 10
- Angular 8

### Setup

#### Clone the source locally
```
    git clone https://github.com/rahulrraja/order-management.git
    cd order-management
```

#### Install project dependencies

Install root directory dependencies
```
$ npm install
```

Install client directory dependencies
```
$ cd client
$ npm install
```

Install server directory dependencies
```
$ cd server
$ npm install
```

#### Creating Mock Data

To generate mock data in database execute
```
$ cd server
$ node db/init-db.js
```

#### Start the app
Go to root directory of the project and execute

```
$ npm start
```

The server will be running on port 3000 and the UI will be running on port 4200 (default)

#### Sample Mock
To Login to UI use below credentials
```
    username: test@gmail.com
    password: test@1234
```