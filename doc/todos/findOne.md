# Show One Todo

Used to get the information of a specific todo.

**URL** : `/todos/:id`

**Method** : `GET`

**Auth Required** : YES

## Success Response

**Code** : `200 OK`

**Content Example**

```json
{
  "id": 1,
  "title": "Todo 1",
  "description": "Lorem ipsum dolor sit, amet consectetur.",
  "completed": true,
  "createdAt": "2022-03-22T10:42:13.000Z",
  "lastUpdated": "2022-03-22T10:42:13.000Z"
}
```

## Error Response

**Condition** : If the todo with the submitted 'id' does not exist

**Code** : `404 Not Found`

**Content Example**

```json
{
  "statusCode": 404,
  "message": ["Todo not found"],
  "error": "Not Found"
}
```

**Condition** : If the todo with the sent id does not belong to the user who requested it

**Code** : `401 Unauthorized`

**Content Example**

```json
{
  "statusCode": 401,
  "message": ["You can't access a todo that doesn't belong to you"],
  "error": "Unauthorized"
}
```
