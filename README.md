## Project Name

Book e-Commerce System


## Introduction

Book e-Commerce System is a full-stack web application that allows users to browse through collection of books. In order to make a purchase, user must register first. User also has ability to become member when signing up. By becoming a member, user will receive promotion codes on registered email. Promotion codes can be used when making purchases to receive extra discounts. Manager account can perform all CRUD operations on books and create promotion codes.

## Built with

- JavaScript
- NodeJS
- ExpressJS
- MongoDB
- ReactJS


## Setup

Clone this repository. You will need node and npm installed globally on your machine. If you want to run database locally make sure that you have mongoDB server installed and running in background. You can also run cloud database using mongoDB Compas. Create a clutser and paste your connection string in dotenv file.

## Seeding Data into Database

To use the code effectively, follow these steps:

Place your Excel file (LibraryData.xlsx) containing the data you want to seed in the specified path (./src/data/LibraryData.xlsx).
Install the required packages (exceljs and sharp) using the following commands: npm install exceljs sharp .
Include the seedData function from the provided code in your application, and call it to start seeding data. The seedData function uses the read-excel-file package to read Excel sheets and sharp for image processing.

## Environment Variables

Create a .env file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

PORT: The port number on which the server will listen for incoming requests. 
JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication. 
MONGO: The connection URL for your MongoDB database. 
SESSION_SECRET: An optional secret key used for session management.

## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/your_username/e-commerce-shopping-cart.git 
Install NPM packages npm install 
Start the project npm start

## For testing:

- Manager credentials:
- - user: manager
- - password: manager123!

- Email credentials:
- Manager: 
- - email: book.store.manager.bbb@gmail.com
- - password: bookstore123!
-  Book Store Info:
- - email: book.store.info.bbb@gmail.com
- - password: bookstore123!




