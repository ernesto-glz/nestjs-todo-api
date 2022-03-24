# SignIn

Used to obtain a Token for a registered User.

**URL** : `/users/signIn`

**Method** : `POST`

**Auth Required** : NO

**Data constraints**

```json
{
  "username": "[valid username]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "username": "iloveauth",
  "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content Example**

```json
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJsInR5cCI6IkpXVCJ",
  "user": {
    "id": 8,
    "username": "example",
    "email": "example@gmail.com"
  }
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 Unauthorized`

**Content Example**

```json
{
  "statusCode": 401,
  "message": ["Incorrect username or password"],
  "error": "Unauthorized"
}
```
