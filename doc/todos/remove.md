# Delete a Todo

Used to delete a Todo.

**URL** : `/todos/:id`

**Method** : `DELETE`

**Auth Required** : YES

## Success Response

**Code** : `200 OK`

**Content Example**

```json
{
  "status": "Deleted",
  "id": 5,
  "title": "Todo to delete",
  "description": "Lorem ipsum dolor sit, amet consectetur.",
  "completed": false,
  "createdAt": "2022-03-23T23:07:03.000Z",
  "lastUpdated": "2022-03-23T23:07:03.000Z"
}
```

## Error Response

**Condition** : If there is no todo belonging to the current user with the submitted 'id'.

**Code** : `404 Not Found`

**Content Example**

```json
{
  "statusCode": 404,
  "message": ["Todo not found"],
  "error": "Not Found"
}
```

**Condition** : If the todo to delete does not belong to the current user.

**Code** : `401 Unauthorized`

**Content Example**

```json
{
  "statusCode": 401,
  "message": ["You can't access a todo that doesn't belong to you"],
  "error": "Unauthorized"
}
```
