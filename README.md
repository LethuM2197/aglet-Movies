MovieDB — Aglet Interactive Interview Brief

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



### Structure

aglet-Movies/
│
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
│
├── db-dump/
│   ├── users.json
│   └── favourites.json
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── tmdb.js
│   │   └── seed.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Favourite.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── controllers/
│   │   ├── movieController.js
│   │   ├── authController.js
│   │   └── favouriteController.js
│   │
│   └── routes/
│       ├── movieRoutes.js
│       ├── authRoutes.js
│       ├── favouriteRoutes.js
│       └── contactRoutes.js
│
└── frontend/
    ├── views/
    │   ├── layout.ejs
    │   ├── contact.ejs
    │   ├── 404.ejs
    │   ├── error.ejs
    │   │
    │   ├── movies/
    │   │   └── index.ejs
    │   │
    │   ├── favourites/
    │   │   └── index.ejs
    │   │
    │   └── auth/
    │       ├── login.ejs
    │       └── signup.ejs
    │
    └── public/
        ├── css/
        │   └── main.css
        │
        └── js/
            └── main.js






### Home Page   <img width="1357" height="684" alt="Home" src="https://github.com/user-attachments/assets/58ffa380-81f7-4a13-9d92-c4edd32a66e8" />

### Movie List
<img width="1325" height="565" alt="Movies List" src="https://github.com/user-attachments/assets/60e8c799-fa28-47fa-9b2e-bc193b5a405c" />
<img width="1318" height="670" alt="Movie List" src="https://github.com/user-attachments/assets/e28fe53e-637e-48b1-a13d-91a60b201edc" />

### Sign In
<img width="746" height="542" alt="Sign In" src="https://github.com/user-attachments/assets/d02dd7ff-dc6e-4333-8d69-f106dbb109dd" />

### Contact
<img width="1365" height="673" alt="Contact Me" src="https://github.com/user-attachments/assets/537012f2-03b6-43ae-b549-be7bc296ed06" />










