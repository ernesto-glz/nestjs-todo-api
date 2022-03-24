## Description

A RESful API for simple todo application made with Nestjs, user registration and authentication with json web tokens (jwt).

## Requirements

- NodeJS & npm
- MySQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Open Endpoints

Open endpoints require no Authentication.

- [SignIn](doc/signIn.md) : `POST /users/signIn`
- [SignUp](doc/signUp.md) : `POST /users/signUp`

## Endpoints that require authentication

Closed endpoints require a valid Token to be included in the header of the request. A Token can be acquired from the Login view above.

### Current user related

Each endpoint manipulates or displays information related to the User whose Token is provided with the request:

- [Show info](doc/users/get.md) : `GET /users`
- [Update email](doc/users/email.md) : `PATCH /users/email`
- [Update password](doc/users/password.md): `PATCH /users/password`

### Todo related

Endpoints to view and manipulate the todos that the authenticated user has permission to access.

- [Show all accesible Todos](doc/todos/findAll.md) : `GET /todos`
- [Create Todo](doc/todos/create.md) : `POST /todos`
- [Show a Todo](doc/todos/findOne.md) : `GET /todos/:id`
- [Update a Todo](doc/todos/update.md) : `PATCH /todos/:id`
- [Delete a Todo](doc/todos/remove.md) : `DELETE /todos/:id`
