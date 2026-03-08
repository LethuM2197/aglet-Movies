### Aglet Movies – Movie Browser Application
Overview

Aglet Movies is a full-stack movie browsing application that integrates with the The Movie Database API to display movie data.

The application allows users to:

Browse movies in a paginated interface

View movie posters, titles, and release dates

Add movies to a favourites list

Log in with a default user account

View saved favourite movies

Access a contact page with developer details

This project was developed as part of the Aglet Interactive Backend / Full Stack Developer Assessment.

### Technologies Used
Backend

Node.js

Express.js

MongoDB

Mongoose

Frontend

HTML5

CSS3

JavaScript

External APIs

The Movie Database API

Development Tools

Git

GitHub

MongoDB Atlas

### Default Login Credentials

Use the following account to test the favourites functionality:
Username: jointheteam
Email: jointheteam@aglet.co.za
Password: @TeamAglet

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

### Project Structure

aglet-movies/
│
├── backend/
│   ├── models
│   ├── routes
│   ├── controllers
│
├── frontend/
│   ├── css
│   ├── js
│   ├── images
│
├── db-dump/
│   └── moviedb_aglet.json
│
├── server.js
├── package.json
└── README.md


### Installation Guide
1. Clone the Repository
git clone https://github.com/LethuM2197/aglet-Movies.git

### Navigate into the project folder:
cd aglet-Movies


### Install Dependencies
npm install

### Environment Variables

Create a .env file in the root directory.

Example configuration:

PORT=3000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=aglet_super_secret_key

TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500

### Run the Application

Start the server:

npm start

The application will run at:

http://localhost:3000

Database Setup

This project uses MongoDB Atlas.

### A database dump is included in the repository under:

/db-dump

You can import it using:

mongorestore

Or manually import it into MongoDB.


### Development Approach

The project was built using Node.js and Express for the backend due to its simplicity, scalability, and strong ecosystem for building APIs.

MongoDB was selected as the database because:

It integrates well with JavaScript applications

It provides flexible document structures

It works well with cloud services like MongoDB Atlas

The frontend was designed to remain simple and functional while focusing on the backend architecture and API integration.

Future Improvements (Brownie Points)

Possible enhancements include:

Movie search functionality

Autocomplete search suggestions

Movie detail popup modal

Improved UI styling

Responsive design improvements



### Home Page   <img width="1357" height="684" alt="Home" src="https://github.com/user-attachments/assets/58ffa380-81f7-4a13-9d92-c4edd32a66e8" />

### Movie List
<img width="1325" height="565" alt="Movies List" src="https://github.com/user-attachments/assets/60e8c799-fa28-47fa-9b2e-bc193b5a405c" />
<img width="1318" height="670" alt="Movie List" src="https://github.com/user-attachments/assets/e28fe53e-637e-48b1-a13d-91a60b201edc" />

### Sign In
<img width="746" height="542" alt="Sign In" src="https://github.com/user-attachments/assets/d02dd7ff-dc6e-4333-8d69-f106dbb109dd" />

### Contact
<img width="1365" height="673" alt="Contact Me" src="https://github.com/user-attachments/assets/537012f2-03b6-43ae-b549-be7bc296ed06" />











