# Update Email

Allow the Authenticated User to update the email.

**URL** : `/users/email`

**Method** : `PATCH`

**Auth Required** : YES

**Data constraints**

```json
{
  "email": "[valid google email]"
}
```

**Data Example**

```json
{
  "email": "newEmail@gmail.com"
}
```

## Success Response

**Code** : `200 OK`

**Content Example**

```json
{
  "status": "success",
  "message": ["Your email has been updated successfully!"]
}
```

## Error Response

**Condition** : If send an invalid email.

**Code** : `400 Bad Request`

**Content Example**

```json
{
  "statusCode": 400,
  "message": ["Email must be a Gmail address"],
  "error": "Bad Request"
}
```
