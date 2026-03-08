<img width="1365" height="538" alt="image" src="https://github.com/user-attachments/assets/84857a14-97de-4c2b-aece-e99d30865e21" /># MovieDB — Aglet Interactive Interview Brief

> A full-stack movie discovery and collection app powered by The Movie Database (TMDB) API.
> Built with **Node.js + Express + MongoDB + EJS**


##  Live Demo

- **Repo:** https://github.com/LethuM2197/aglet-Movies
- **Test Login:**
  - Username: `jointheteam`
  - Email: `jointheteam@aglet.co.za`
  - Password: `@TeamAglet`


##  Features

- 🎬 9 movie cards per page · 5 pages · 45 total movies
- ⭐ Favourites list — login-gated, persisted in MongoDB
- 🔐 Session-based authentication with bcrypt password hashing
- 🔍 Live search with autocomplete
- 🎭 Movie detail popup modal
- 📱 Fully responsive — mobile → tablet → desktop
- 👤 Default test user pre-seeded



## 🛠 Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Runtime | Node.js | Fast, non-blocking I/O — ideal for API-heavy apps |
| Framework | Express.js | Minimal, flexible, battle-tested |
| Database | MongoDB + Mongoose | Schema flexibility for movie/user data |
| Templating | EJS + express-ejs-layouts | Server-side rendering, no build step needed |
| Auth | express-session + bcryptjs | Secure sessions with hashed passwords |
| API Caching | node-cache | Reduces TMDB API calls with 5-minute cache |
| Styling | CSS with BEM naming | Custom properties, responsive grid |


## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB running locally OR MongoDB Atlas account
- TMDB API Key — [Get one free here](https://www.themoviedb.org/settings/api)


### 1. Clone the repository
```
git clone https://github.com/LethuM2197/aglet-Movies.git
cd aglet-Movies
```

### 2. Install dependencies

npm install


### 3. Create your .env file
Create a file called `.env` in the root folder and add:

PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/moviedb_aglet
SESSION_SECRET=aglet_super_secret_key_2024
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500
```
> Replace `your_tmdb_api_key_here` with your actual TMDB API key

### 4. Start MongoDB
If running locally, open a separate terminal and run:

mongod

Or use MongoDB Atlas and paste your Atlas connection string as `MONGO_URI`

### 5. Seed the default user

npm run seed

This creates the test user:
- Username: `jointheteam`
- Email: `jointheteam@aglet.co.za`
- Password: `@TeamAglet`

### 6. Start the server

npm run dev

Open your browser at: **http://localhost:3000**



## 🗺 Folder Structure
```
aglet-Movies/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── db-dump/
│   ├── users.json
│   └── favourites.json
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── tmdb.js
│   │   └── seed.js
│   ├── models/
│   │   ├── User.js
│   │   └── Favourite.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   ├── movieController.js
│   │   ├── authController.js
│   │   └── favouriteController.js
│   └── routes/
│       ├── movieRoutes.js
│       ├── authRoutes.js
│       ├── favouriteRoutes.js
│       └── contactRoutes.js
└── frontend/
    ├── views/
    │   ├── layout.ejs
    │   ├── contact.ejs
    │   ├── 404.ejs
    │   ├── error.ejs
    │   ├── movies/
    │   │   └── index.ejs
    │   ├── favourites/
    │   │   └── index.ejs
    │   └── auth/
    │       ├── login.ejs
    │       └── signup.ejs
    └── public/
        ├── css/
        │   └── main.css
        └── js/
            └── main.js
```

---

## 🔑 API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/` | No | Movie listing (paginated) |
| GET | `/api/search?q=` | No | Search autocomplete |
| GET | `/api/movie/:id` | No | Movie detail |
| GET | `/auth/login` | No | Login page |
| POST | `/auth/login` | No | Authenticate user |
| GET | `/auth/signup` | No | Signup page |
| POST | `/auth/signup` | No | Register new user |
| GET | `/auth/logout` | Yes | Destroy session |
| GET | `/favourites` | Yes | Favourites list |
| POST | `/favourites/add` | Yes | Add a favourite |
| DELETE | `/favourites/remove/:id` | Yes | Remove a favourite |
| GET | `/contact` | No | Contact page |


## 🗄 Database Dump

A `db-dump/` folder is included with the seeded database.

To restore manually:

node -e "
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const User = require('./backend/models/User');
  const users = JSON.parse(fs.readFileSync('./db-dump/users.json'));
  await User.insertMany(users);
  console.log('Database restored!');
  process.exit();
});
"




##  Rationale & Approach

### Why Node.js + Express?
Node.js is the most natural fit for an API-heavy app — async I/O is first-class. Express is lightweight with minimal boilerplate.

### Why MongoDB?
The brief listed MongoDB explicitly. Storing favourites as `{ userId, movieId, title, poster }` is a perfect document model — no JOINs needed.

### Why EJS?
No build step — the assessor can clone and run immediately with `npm start`. EJS is readable and close to plain HTML.

### TMDB Pagination Strategy
TMDB returns 20 movies per page. The brief requires 9 per page across 45 movies (5 pages). Each app page maps to a slice of TMDB results, fetching a second TMDB page when the 9-movie window spans a boundary.

### Caching
A 5-minute in-memory cache wraps all TMDB calls to avoid hitting rate limits during testing. 

<img width="1365" height="673" alt="Screenshot 2026-03-08 173958" src="https://github.com/user-attachments/assets/f370b6cc-58e9-4f2e-9f9d-b3954423427d" />
<img width="1365" height="609" alt="Screenshot 2026-03-08 173932" src="https://github.com/user-attachments/assets/82c04c62-f0ec-443a-9a80-e6435fc19137" />
<img width="1318" height="670" alt="Screenshot 2026-03-08 173849" src="https://github.com/user-attachments/assets/1c3597df-f611-4ab6-b6a3-d7e20ab5363b" />
<img width="1357" height="684" alt="Screenshot 2026-03-08 173830" src="https://github.com/user-attachments/assets/8353b59b-ee57-432b-8c4c-638ef98fb444" />



