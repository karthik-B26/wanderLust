# WanderLust 🏡

A full-stack Airbnb-inspired listing platform built with **Node.js, Express.js, MongoDB, Mongoose, EJS, EJS-Mate, Bootstrap, and Passport.js**.

## Features

- Create, view, edit, and delete listings
- User authentication with Passport.js
- User registration and login
- Session-based authentication
- Flash messages for user feedback
- Create and delete reviews
- Review ratings and comments
- MongoDB database integration with Mongoose
- Listing and review relationships
- Cascade deletion of reviews when a listing is deleted
- Dynamic EJS templates
- Reusable EJS layouts and partials
- Responsive UI with Bootstrap
- PUT and DELETE requests using Method-Override
- Joi-based server-side validation
- Custom Express error handling
- Async route error handling
- Default images for listings

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Mongoose**

### Database
- **MongoDB**

### Authentication
- **Passport.js**
- **Passport-Local-Mongoose**
- **Express-Session**

### Frontend
- **EJS**
- **EJS-Mate**
- **HTML**
- **CSS**
- **Bootstrap**

### Validation & Middleware
- **Joi**
- **Method-Override**
- **Connect-Flash**

## Project Structure

```text
WanderLust/
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   └── review.js
│
├── validation/
│   ├── vailidateschema.js
│   └── validateReview.js
│
├── utils/
│   ├── customerror.js
│   └── WrapAsync.js
│
├── public/
│   └── style.css
│
├── views/
│   ├── includes/
│   │   └── navbar.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listing.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   ├── onelisting.ejs
│   └── error.ejs
│
├── app.js
├── package.json
└── README.md
