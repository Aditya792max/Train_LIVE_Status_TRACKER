# Train Tracker API

An Express and MongoDB API for user registration, authentication, live train details, and train coach positions. The server also proxies train data from RailRadar.

## Requirements

- Node.js 18 or newer (the train endpoints use the built-in `fetch` API)
- MongoDB connection string
- RailRadar API key for the live train and coach endpoints

## Run locally

1. Open a terminal in the `Server` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `Server/.env` with your own values:

   ```env
   PORT=8080
   MONGODB_URI=mongodb://127.0.0.1:27017/train_tracker
   JWT_SECRET=replace_with_a_long_random_secret
   RAILRADAR_API_KEY=your_railradar_api_key
   ```

   For MongoDB Atlas, use your Atlas connection string for `MONGODB_URI`. Keep `.env` private and do not commit real credentials.

4. Start the API from `Server`:

   ```bash
   npm run dev
   ```

   Or run it without auto-restart:

   ```bash
   npm start
   ```

The API listens on `http://localhost:8080` by default. Set `PORT` to use a different port. MongoDB and `JWT_SECRET` must be configured for the server to start; the RailRadar key is needed for train and coach lookups.

## Postman setup

For JSON requests, choose **Body → raw → JSON** and set `Content-Type: application/json`.

### Register a user

`POST http://localhost:8080/api/auth/register`

Choose **Authorization → No Auth**. Send:

```json
{
  "name": "Aman",
  "age": 22,
  "aadhaarLast4": "1234",
  "email": "aman@example.com",
  "password": "password123"
}
```

The response includes a user object and a JWT token. Aadhaar must be the last four digits only, and the password must contain at least eight characters. Email addresses must be unique.

### Log in

`POST http://localhost:8080/api/auth/login`

Choose **Authorization → No Auth**. Send:

```json
{
  "email": "aman@example.com",
  "password": "password123"
}
```

Copy the `token` from the response. For protected requests, choose **Authorization → Bearer Token** in Postman and paste the token there.

## Endpoints

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/` | No | Check that the API is running |
| `POST` | `/api/auth/register` | No | Create an account |
| `POST` | `/api/auth/login` | No | Log in and get a JWT |
| `GET` | `/api/auth/me` | Bearer token | Get the current user's profile |
| `GET` | `/api/users` | Bearer token | Get the current user's profile |
| `GET` | `/api/users/:id` | Bearer token | Get your profile by user ID |
| `PATCH` | `/api/users/:id` | Bearer token | Update your profile |
| `DELETE` | `/api/users/:id` | Bearer token | Delete your account |
| `GET` | `/api/trains/:number/live` | No | Fetch live train details for a 5-digit train number |
| `GET` | `/api/coaches/:number/:station` | No | Fetch coach positions for a 5-digit train number and station code |

The user endpoints only allow access to the authenticated user's own account. For example, update your profile with `PATCH /api/users/<your-user-id>` and a JSON body such as:

```json
{
  "name": "Aman Kumar"
}
```

Train and coach endpoints pass the RailRadar API response through to the client. If the RailRadar key is missing, these endpoints return `503`; if RailRadar rejects the key or request, its HTTP status and response are returned.

## Common responses

- `400` — invalid input, such as a train number that is not five digits
- `401` — missing, invalid, or expired bearer token on a protected endpoint
- `403` — authenticated user tried to access another user's profile
- `409` — an account with that email already exists
- `503` — RailRadar API key is not configured for a train lookup
- `504` — RailRadar request timed out

## Frontend

The React + Vite dashboard lives at the repository root. It includes live train lookup, coach-position search, and saved train CRUD. Saved trains are stored in the current browser's local storage.

1. From the repository root, install and start the frontend:

   ```bash
   npm install
   npm run dev
   ```

2. In a second terminal, start the API by following the steps above in `Server`.

3. Open the Vite URL printed in the terminal (normally `http://localhost:5173`). The frontend expects the API at `http://localhost:8080/api`; set `VITE_API_BASE_URL` in a root `.env` file to change it. A sample is available in `.env.example`.

The frontend uses Vite 6 and supports Node.js 18 or newer.
# Train_LIVE_Status_TRACKER
