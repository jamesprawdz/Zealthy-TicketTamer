# Zealthy TicketTamer

Zealthy TicketTamer is a full-stack application designed to manage support tickets efficiently. It features a user-friendly frontend interface and a robust backend to handle ticket operations and user authentication.

## Demo

Check out the live demo of the application [here](https://zealthy-ticket-tamer-frontend.vercel.app/).

## Admin Access

Use the following credentials to access the admin dashboard:

- **Username:** admin1
- **Password:** T3stPaSSwoRD!

## Features

- **Admin Authentication:** Secure admin login.
- **Submit Tickets Without Login:** Users can submit tickets without needing to log in.
- **Admin Dashboard:** Authorized admins can view, update, and delete tickets.
- **Real-time Updates:** Get instant updates on ticket status and activities.

## Project Structure
```bash
.
├── README.md
├── backend
│   ├── config
│   │   └── databaseConfig.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── ticketController.js
│   ├── index.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── adminModel.js
│   │   └── ticketModel.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postgresql.conf
│   ├── public
│   │   └── favicon.png
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   ├── utils
│   │   ├── emailLogUtil.js
│   │   ├── hashUtil.js
│   │   ├── jwtUtil.js
│   │   └── logUtil.js
│   └── vercel.json
└── frontend
    ├── dist
    │   ├── assets
    │   │   └── index-CU2Rl9V_.js
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.png
    │   ├── manifest.json
    │   ├── robots.txt
    │   └── zealthy-logo.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── components
    │   │   ├── AddTicketForm.jsx
    │   │   ├── NavigationBar.jsx
    │   │   └── TicketList.jsx
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── AdminDashboardPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── TicketDetailPage.jsx
    │   └── utils
    │       ├── api.js
    │       └── logUtil.js
    ├── vercel.json
    └── vite.config.js

17 directories, 45 files
```

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - Vanilla CSS
  - Vercel
- **Backend:**
  - Node.js
  - Express.js
  - Neon - PostgreSQL
  - JWT for authentication
  - Vercel

## Installation

### Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```sh
   git clone https://github.com/jamesprawdz/Zealthy-TicketTamer.git
   cd Zealthy-TicketTamer/backend
   ```
2. Install backend dependencies:

   ```sh
   npm install
   ```
3. Set up the .env file with the following variables:

   ```sh
   POSTGRES_URL=<your_postgres_url>
   NODE_ENV=development
   JWT_SECRET=<your_jwt_secret>
   FRONTEND_URL=<your_frontend_url>
   ```
4. Start the backend server:

   ```sh
   npm run dev
   ```
### Frontend Setup

1. Navigate to the frontend directory and install frontend dependencies:

   ```sh
   cd ../frontend
   npm install
   ```
2. Set up the .env file with the following variable:

   ```sh
   VITE_API_URL=<your_api_url>
   ```
3. Start the frontend server:

   ```sh
   npm start
   ```
## Deployment

### Backend

The backend is configured to be deployed on Vercel with the `vercel.json` file present in the backend directory.

### Frontend

The frontend is also configured to be deployed on Vercel with the `vercel.json` file present in the frontend directory.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login a user

### Tickets

- `POST /api/tickets` - Create a new ticket
- `GET /api/admin/tickets` - Get all tickets
- `GET /api/admin/tickets/:id` - Get a specific ticket by ID
- `PUT /api/admin/tickets/:id` - Update a ticket by ID
- `DELETE /api/admin/tickets/:id` - Delete a ticket by ID

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please reach out to [sebaprawdzik@gmail.com](mailto:sebaprawdzik@gmail.com).
