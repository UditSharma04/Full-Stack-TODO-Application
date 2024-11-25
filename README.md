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

## How the webpage looks
https://github.com/user-attachments/assets/946d00cd-b3a6-426d-847b-90de264021ba






## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hellouditt/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hellouditt)

## License

This project is licensed under the ISC License.
