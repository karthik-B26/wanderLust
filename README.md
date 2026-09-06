# WanderLust 🏡

A full-stack Airbnb-inspired listing platform built with **Node.js, Express, MongoDB, Mongoose, EJS, EJS-Mate, and Bootstrap**.

## Features

- Create, view, edit, and delete listings
- MongoDB database integration with Mongoose
- Dynamic EJS templates
- Reusable EJS layouts and partials
- Responsive listing cards with Bootstrap
- PUT and DELETE requests using Method-Override
- Default images for listings

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** HTML, CSS, Bootstrap
- **Templating:** EJS, EJS-Mate
- **Other:** Method-Override

## Project Structure

```text
WanderLust/
├── models/
│   └── listing.js
├── public/
│   └── style.css
├── views/
│   ├── includes/
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listing.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   └── onelisting.ejs
├── app.js
├── package.json
└── README.md
