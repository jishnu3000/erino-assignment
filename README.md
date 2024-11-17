# erino-assignment
This project is a React-based CRUD (Create, Read, Update, Delete) application for managing contact information. It uses a Node.js and Express backend, MongoDB for data storage, and Material-UI for styling. Users can add, edit, delete, and view contacts through an intuitive interface, with instant feedback provided via notifications.

## Features
- **Add Contacts:** Users can add new contacts by filling out a form with required fields such as first name, email, and phone number.
- **Edit Contacts:** Contacts can be updated inline in the table view.
- **Delete Contacts:** Users can delete a contact with a single click.
- **Pagination:** The table view supports pagination to manage large datasets efficiently.
- **Notifications:** Success and error messages are displayed for user actions, providing feedback on operations like saving, updating, or deleting contacts.
- **Validation:** Basic validation ensures that required fields are filled before submission. The backend also checks for duplicate email or phone entries.

## Technologies Used
- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **HTTP Client:** Axios

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB**: MongoDB Atlas account
- **npm** or **yarn**

## Steps to Run the Project:
1. **Clone the Repository**  
   ```bash
    git clone <repository-url>
    cd <repository-folder>
2. **Install dependencies for both client and server** 
   ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
3. Configure the environment variables: Create a ```.env``` file in the ```server``` directory with the following variables:
  ```bash
    MONGODB_URI=mongodb+srv://<your_username>:<your_password>@cluster0.npr7jys.mongodb.net/<your_app_name>?retryWrites=true&w=majority&appName=Cluster0
    PORT=3003
  ```
4. Start the server:
  ```bash
    cd server
    npm start
  ```
5. Start the client:
  ```bash
    cd ../client
    npm run dev
  ```
6. Access the application in your browser at http://localhost:3000.

## Backend API Endpoints
- GET /api/contacts 
  Fetch all contacts.
- POST /api/contacts
  Add a new contact.
- PUT /api/contacts/:id
  Update an existing contact.
- DELETE /api/contacts/:id
  Delete a contact.

## Chosen Database MongoDB
MongoDB is a NoSQL database that stores data in a document-oriented format. It is suited for this application due to its scalability, flexibility, and ease of use.



## Database Schema
The MongoDB collection ```contacts``` uses the following schema:
  ```bash
    {
      "firstName": "String",
      "lastName": "String",
      "email": "String",
      "phone": "String",
      "company": "String",
      "jobTitle": "String"
    }
  ```
Schema script below:
  ```bash
    const mongoose = require("mongoose");

    const contactSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      phone: Number,
      company: String,
      jobTitle: String,
    });

    contactSchema.set("toJSON", {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    });

    module.exports = mongoose.model("Contact", contactSchema);
  ```

## Major Technical Decisions
- Axios: Used for API calls due to its simplicity and features like request/response interceptors.
- MongoDB: Ideal for this project due to its schema flexibility and ease of use with Node.js.
- Notifications: Implemented using Material-UI's Snackbar and Alert components for user feedback.

## Challenges and Solutions
- Challenge: Handling duplicate data efficiently. 
  Solution: The backend checks for existing contacts with the same email or phone and returns a 409 Conflict status if found.

- Challenge: Providing real-time feedback for user actions.
Solution: Integrated notifications using Material-UI's Snackbar and Alert components for instant user feedback.

