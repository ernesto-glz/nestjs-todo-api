# SignUp

Used to register new users.

**URL** : `/users/signUp`

**Method**: `POST`

**Auth Required** : NO

**Data constraints**

```json
{
  "username": "[valid username]",
  "password": "[password in plain text]",
  "passwordConfirm": "[must match with password]",
  "email": "[valid google email]"
}
```

**Data Example**

```json
{
  "username": "example",
  "password": "randompwd",
  "passwordConfirm": "randompwd",
  "email": "example@gmail.com"
}
```

## Success Response

**Code** : `201 Created`

**Content Example**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJsInR5cCI6IkpXVCJ",
  "user": {
    "username": "example",
    "email": "example@gmail.com",
    "id": 8
  }
}
```

## Error Response

**Condition** : If username already exists.

**Code** : `409 Conflict`

**Content Example**

```json
{
  "statusCode": 409,
  "message": ["User already exists"],
  "error": "Conflict"
}
```
