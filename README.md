# Node Hotel Application

The Node Hotel Application is a Node.js-based system using the Express.js framework and MongoDB. It manages information related to persons (staff) and menu items, exposing specific endpoints to handle CRUD operations for both.

## Endpoints

### Persons

- **Add a Person**  
  **POST /person**  
  Adds a person to the system with details such as name, role, etc.

- **Get All Persons**  
  **GET /person**  
  Retrieves a list of all persons in the system.

- **Get Persons by Work Type**  
  **GET /person/:workType**  
  Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).

- **Update a Person**  
  **PUT /person/:id**  
  Updates the details of a specific person identified by their ID.

- **Delete a Person**  
  **DELETE /person/:id**  
  Deletes a person from the system based on their ID.

### Menu Items

- **Add a Menu Item**  
  **POST /menu**  
  Adds a menu item to the system with details such as name, price, taste, etc.

- **Get All Menu Items**  
  **GET /menu**  
  Retrieves a list of all menu items in the system.

- **Get Menu Items by Taste**  
  **GET /menu/:taste**  
  Retrieves a list of menu items based on their taste (e.g., sweet, spicy, sour).

- **Update a Menu Item**  
  **PUT /menu/:id**  
  Updates the details of a specific menu item identified by its ID.

- **Delete a Menu Item**  
  **DELETE /menu/:id**  
  Deletes a menu item from the system based on its ID.

## Data Models

### Person

The Person data model represents information about staff members in the hotel.

- `name`: String (Person's name)
- `age`: Number (Person's age)
- `work`: Enum (Role in the hotel, such as chef, waiter, manager)
- `mobile`: String (Person's mobile number)
- `email`: String (Person's email address, unique)
- `address`: String (Person's address)
- `salary`: Number (Person's salary)

**Example:**

```json
{
  "name": "John Doe",
  "age": 30,
  "work": "waiter",
  "mobile": "123-456-7890",
  "email": "john@example.com",
  "address": "123 Main Street",
  "salary": 30000
}
```

# Usage
## Install Dependencies
```
npm install
```
