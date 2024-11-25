# Full-Stack TODO Application

A modern, full-stack Todo List application with a clean and simple UI, built using React and Node.js.

## Features

- Clean and intuitive user interface
- Responsive design
- Real-time updates
- MySQL database integration
- Task management functionality

## Tech Stack

### Frontend
- React.js
- Vite
- Axios for API calls
- Framer Motion for animations
- React Hot Toast for notifications
- SweetAlert2 for dialogs
- React Router DOM for routing

### Backend
- Node.js
- Express.js
- MySQL2 for database operations
- CORS for cross-origin resource sharing
- Nodemon for development

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Full-Stack-TODO-Application.git
cd Full-Stack-TODO-Application
```

2. Set up the Client
```bash
cd Client
npm install
```

3. Set up the Server
```bash
cd ../Server
npm install
```

4. Database Setup
- Create a MySQL database
- Create a table with the following structure:
```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
);
```
- Update the database configuration in `Server/index.js`:
```javascript
const db = mysql.createConnection({
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});
```

## Running the Application

1. Start the Server
```bash
cd Server
npm start
```

- Now go to your browser and search this
  ```
    http://localhost:5173/
  ```
  - you will see this web page
![6](https://github.com/user-attachments/assets/8b559752-5e5c-47f7-8db1-441f6f35747b)

- Database Setup
 - Make the following table in your mysql workbench
   ![7](https://github.com/user-attachments/assets/d826567d-9b3c-4f7c-b33f-370ea2e5692b)

 - Now in the server folder open index.js and update the following part to conncect to your Mysql database
   ```
   const db = mysql.createConnection({
    host : 'yourConnectionName',
    user : 'yourUserName',
    password : "yourWorkbenchPassword",
    database : 'yourSchemaName'
   })
   ```
   example
   ```
   const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "Udit@2002",
    database : 'sys'
   })
   ```
Now the local installation is complet u can visit the localhost:5173 and use the todoList app
 

## How the webpage looks
https://github.com/user-attachments/assets/946d00cd-b3a6-426d-847b-90de264021ba






## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hellouditt/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hellouditt)

## License

This project is licensed under the ISC License.
