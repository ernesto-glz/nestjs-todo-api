# Update Password

Allow the Authenticated User to update the password.

**URL** : `/users/password`

**Method** : `PATCH`

**Auth Required** : YES

**Data constraints**

```json
{
  "currentPassowrd": "[the current password]",
  "password": "[new password]",
  "passwordConfirm": "[must match with the new password]"
}
```

**Data Example**

```json
{
  "currentPassowrd": "abcd1234",
  "password": "12345678",
  "passwordConfirm": "12345678"
}
```

## Success Response

**Code** : `200 OK`

**Content Example**

```json
{
  "status": "success",
  "message": ["Your password has been updated successfully!"]
}
```

## Error Response

**Condition** : If the current password is incorrect.

**Code** : `400 Bad Request`

**Content Example**

```json
{
  "statusCode": 401,
  "message": ["Incorrect password"],
  "error": "Unauthorized"
}
```

**Condition** : if the 'password' and 'passwordConfirm' fields do not match.

**Code** : `400 Bad Request`

**Content Example**

```json
{
  "statusCode": 401,
  "message": ["Password does not match"],
  "error": "Unauthorized"
}
```
