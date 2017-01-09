# Central End User Registry Documentation
***

In this guide, we'll walk through the different Central End User Registry endpoints:
* `GET` [**Get user by number**](#get-user-by-number)
* `POST` [**Create user**](#create-user)
* `GET` [**Get all users**](#get-all-users) 

Information about various errors returned can be found here:
* [**Error Information**](#error-information)

The different endpoints often deal with these [data structures:](#data-structures) 
* [**User Object**](#user-object)

### Introduction

***

## Endpoints

### **Get user by number**
This endpoint retrieves a user's information from the registry.

#### HTTP Request
```GET http://central-end-user-registry/users/12345678```

#### Query Params
| Field | Type | Description |
| ----- | ---- | ----------- |
| identifier | String | Identifier for the user |

#### Response 200 OK
| Field | Type | Description |
| ----- | ---- | ----------- |
| Object | User | The [User object](#user-object) retrieved |



#### Request
```http
GET http://central-end-user-registry/users/12345678 HTTP/1.1 HTTP/1.1
```

#### Response
``` http
HTTP/1.1 200 OK
{
  "url": "http://user.dfsp.com",
  "number": "12345678"
}
```

#### Errors (4xx)
| Field | Description |
| ----- | ----------- |
| NotFoundError | The requested resource could not be found |
``` http
{
  "id": "NotFoundError",
  "message": "The requested resource could not be found."
}
```

### **Create user**
This endpoint allows a user to be registered and used with the registry

#### HTTP Request
```POST http://central-end-user-registry/users```

#### Authentication
| Type | Description |
| ---- | ----------- |
| HTTP Basic | The username and password are admin:admin |

#### Headers
| Field | Type | Description |
| ----- | ---- | ----------- |
| Content-Type | String | Must be set to `application/json` |

#### Request body
| Field | Type | Description |
| ----- | ---- | ----------- |
| url | String | Url for the user |

#### Response 201 Created
| Field | Type | Description |
| ----- | ---- | ----------- |
| Object | User | The [User object](#user-object) retrieved |

#### Request
``` http
POST http://central-directory/commands/register HTTP/1.1
Content-Type: application/json
{
  "url": "http://user.dfsp1.com",
}
```

#### Response
``` http
HTTP/1.1 201 CREATED
Content-Type: application/json
{
  "url": "http://user.dfsp1.com",
  "number": "12345678"
}
```

### **Get all users**
This endpoint allows retrieval of all of the registry's users

#### HTTP Request
```GET http://central-end-user-registry/users```

#### Authentication
| Type | Description |
| ---- | ----------- |
| HTTP Basic | The username and password are the key and secret of a registered DFSP, ex dfsp1:dfsp1 |

#### Response 200 OK
| Field | Type | Description |
| ----- | ---- | ----------- |
| Object | Array | List of supported [User objects](#user-object) |


#### Request
```http
GET http://central-end-user-registry/users HTTP/1.1
```

#### Response
``` http
HTTP/1.1 200 OK
[
  {
    "url": "http://user.dfsp.com",
    "number": "12345678"
  },
  {
    "url": "http://user.dfsp2.com",
    "number": "90123456"
  },
  {
    "url": "http://user.dfsp2.com",
    "number": "78901234"
    }
]
```

***

## Data Structures

### User Object

Represents a user that has registered with the Central End User Registry.

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | String | Url for the user |
| number | String | Identifier for the user |

***

## Error information

This section identifies the potential errors returned and the structure of the response.

An error object can have the following fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | String | An identifier for the type of error |
| message | String | A message describing the error that occurred |
| validationErrors | Array | *Optional* An array of validation errors |
| validationErrors[].message | String | A message describing the validation error |
| validationErrors[].params | Object | An object containing the field that caused the validation error |
| validationErrors[].params.key | String | The name of the field that caused the validation error |
| validationErrors[].params.value | String | The value that caused the validation error |
| validationErrors[].params.child | String | The name of the child field |

``` http
HTTP/1.1 404 Not Found
Content-Type: application/json
{
  "id": "InvalidQueryParameterError",
  "message": "Error validating one or more query parameters",
  "validationErrors": [
    {
      "message": "'0' is not a registered identifierType",
      "params": {
        "key": "identifierType",
        "value": "0"
      }
    }
  ]
}
```
