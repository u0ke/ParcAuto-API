# ParcAuto-API

Express API for managing a list of rental vehicles stored in memory.

## Requirements

- Node.js
- npm
- Postman

## Installation

```bash
npm install
```

The project uses ES modules. [package.json](/Users/0ke/OneDrive/Documents/ParcAuto-API/package.json) must contain:

```json
{
  "type": "module"
}
```

## Start the server

```bash
npm start
```

The API is available at `http://localhost:3000`.

## Vehicle resource

```json
{
  "id": 1,
  "marque": "Dacia",
  "model": "Logan",
  "immatriculation": "12345-A-6",
  "disponible": true
}
```

`id` and `disponible` are assigned by the server. A created vehicle always starts with `disponible: true`.

## API routes

| Method | URL | Description | Success | Error |
|---|---|---|---|---|
| GET | `/vehicles` | Lists all vehicles | `200` | - |
| GET | `/vehicles?disponible=true` | Lists only available vehicles | `200` | - |
| GET | `/vehicles/:id` | Returns one vehicle | `200` | `404` |
| POST | `/vehicles` | Creates a vehicle | `201` | `400` |
| PATCH | `/vehicles/:id` | Modifies one or more fields | `200` | `404` |
| DELETE | `/vehicles/:id` | Deletes a vehicle | `204` | `404` |

## Test with Postman

### 1. Get all vehicles

```text
GET http://localhost:3000/vehicles
```

Test result: `200 OK`.

### 2. Get available vehicles

```text
GET http://localhost:3000/vehicles?disponible=true
```

Test result: `200 OK`. Only vehicles with `disponible: true` are returned.

### 3. Get one vehicle

```text
GET http://localhost:3000/vehicles/1
```

Test result: `200 OK`.

For a missing vehicle:

```text
GET http://localhost:3000/vehicles/999
```

Test result: `404 Not Found`.

```json
{
  "error": "Vehicle not found"
}
```

### 4. Create a vehicle

```text
POST http://localhost:3000/vehicles
```

Select **Body → raw → JSON** and send:

```json
{
  "marque": "Ford",
  "model": "Fiesta",
  "immatriculation": "11111-A-1"
}
```

Test result: `201 Created`.

The response includes an automatically assigned `id` and `disponible: true`.

If a required field is missing:

```json
{
  "marque": "Ford"
}
```

Test result: `400 Bad Request`.

```json
{
  "error": "Missing required fields"
}
```

### 5. Modify a vehicle

```text
PATCH http://localhost:3000/vehicles/1
```

Select **Body → raw → JSON** and send:

```json
{
  "disponible": false
}
```

Test result: `200 OK`.

For a missing vehicle:

```text
PATCH http://localhost:3000/vehicles/999
```

Test result: `404 Not Found`.

```json
{
  "error": "Vehicle not found"
}
```

### 6. Delete a vehicle

Create a temporary vehicle, then use its returned `id`:

```text
DELETE http://localhost:3000/vehicles/4
```

Test result: `204 No Content`. No response body is returned.

For a missing vehicle:

```text
DELETE http://localhost:3000/vehicles/999
```

Test result: `404 Not Found`.

```json
{
  "error": "Vehicle not found"
}
```

### 7. Test an unknown route

```text
GET http://localhost:3000/unknown
```

Test result: `404 Not Found`.

```json
{
  "erreur": "Route introuvable"
}
```

## Middleware

[journal.js](/Users/0ke/OneDrive/Documents/ParcAuto-API/middlewares/journal.js) logs the method and URL of every request.

Example:

```text
GET /vehicles
```

[notFound.js](/Users/0ke/OneDrive/Documents/ParcAuto-API/middlewares/notFound.js) handles all routes that do not match a registered route. It must be placed after the vehicle routes in [server.js](/Users/0ke/OneDrive/Documents/ParcAuto-API/server.js).