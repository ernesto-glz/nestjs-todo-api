# Show All Todos

Used to get all todos that the currently authenticated user has access to.

**URL** : `/todos`

**Method** : `GET`

**Auth Required** : YES

## Success Response

**Code** : `200 OK`

**Content Example**

```json
[
  {
    "id": 1,
    "title": "Todo 1",
    "description": "Lorem ipsum dolor sit, amet consectetur.",
    "completed": true,
    "createdAt": "2022-03-22T10:42:13.000Z",
    "lastUpdated": "2022-03-22T10:42:13.000Z"
  },
  {
    "id": 2,
    "title": "Todo 2",
    "description": "Lorem ipsum dolor sit, amet consectetur.",
    "completed": false,
    "createdAt": "2022-03-23T23:05:34.000Z",
    "lastUpdated": "2022-03-23T23:05:34.000Z"
  },
  {
    "id": 3,
    "title": "Todo 3",
    "description": "Lorem ipsum dolor sit, amet consectetur.",
    "completed": false,
    "createdAt": "2022-03-23T23:07:03.000Z",
    "lastUpdated": "2022-03-23T23:07:03.000Z"
  }
]
```
