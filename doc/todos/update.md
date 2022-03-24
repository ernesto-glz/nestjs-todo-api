# Update a Todo

Used to update a Todo.

**URL** : `/todos/:id`

**Method** : `PATCH`

**Auth Required** : YES

**Data constraints**

```json
{
  "title": "[Title of minimum length 4]",
  "description": "[Description of maximun length 250]",
  "completed": "[boolean (true or false)]"
}
```

**Data example Partial data is allowed**

```json
{
  "title": "Updated Title"
}
```

## Success Response

**Code** : `200 OK`

**Content Example**

```json
{
  "id": 3,
  "title": "Updated Title",
  "description": "Lorem ipsum dolor sit, amet consectetur.",
  "completed": false,
  "createdAt": "2022-03-22T10:42:13.000Z",
  "lastUpdated": "2022-03-22T10:42:13.000Z"
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

**Condition** : If the todo to update does not belong to the current user.

**Code** : `401 Unauthorized`

**Content Example**

```json
{
  "statusCode": 401,
  "message": ["You can't access a todo that doesn't belong to you"],
  "error": "Unauthorized"
}
```
