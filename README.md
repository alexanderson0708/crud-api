# CRUD-API

### Requirements
[TASK-LINK (CRUD-API)](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

Installation

> $ git clone https://github.com/alexanderson0708/crud-api.git

> $ npm install

### Configuration

You should rename file with name **example** => **.env**

### Scripts
Run application in development mode
> $ npm run start:dev

Run application in production mode
> $ npm run start:prod

Run application in cluster mode
> $ npm run start:dev:multi

> $ npm run start:dev:prod

### Endpoints
1. Endpoints `api/users`:

- **GET** `api/users` is used to get all persons
    - Server should answer with `status code` **200** and all users records
- **GET** `api/users/{userId}` 
    - Server should answer with `status code` **200** and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server should answer with `status code` **201** and newly created record
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/{userId}` is used to update existing user
    - Server should answer with` status code` **200** and updated record
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

2. Errors on the server side that occur during the processing of a request - response with `status code` **500**
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) - response with `status code` **404** 

### Script for testing
This script runs e2e tests:
>$ npm run test
