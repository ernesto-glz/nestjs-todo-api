# Create Todo

Used to create a Todo.

**URL** : `/todos`

**Method** : `POST`

**Auth Required** : YES

**Data constraints**

```json
{
  "title": "[Title of minimum length 4]",
  "description": "[Description of maximun length 250]"
}
```

**Data Example**

```json
{
  "title": "Example Todo",
  "description": "Take the dog out"
}
```

## Success Response

**Code** : `201 Created`

**Content Example**

```json
{
  "id": 7,
  "title": "Example Todo",
  "description": "Take the dog out",
  "completed": false,
  "createdAt": "2022-03-24T01:31:54.000Z",
  "lastUpdated": "2022-03-24T01:31:54.000Z"
}
```

## Error Response

**Condition** : If the user already has a todo with that title.

**Code** : `409 Conflict`

**Content Example**

```json
{
  "statusCode": 409,
  "message": ["Todo already exists"],
  "error": "Conflict"
}
```
