# Book-A-Meal

[![Build Status](https://travis-ci.org/ozimos/Book-A-Meal.svg?branch=157119216-CI-codeCoverage-dummy)](https://travis-ci.org/ozimos/Book-A-Meal)
[![Coverage Status](https://coveralls.io/repos/github/ozimos/Book-A-Meal/badge.svg?branch=157119216-CI-codeCoverage-dummy)](https://coveralls.io/github/ozimos/Book-A-Meal?branch=157119216-CI-codeCoverage-dummy)
[![Maintainability](https://api.codeclimate.com/v1/badges/77dae76840f23281165a/maintainability)](https://codeclimate.com/github/ozimos/Book-A-Meal/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/77dae76840f23281165a/test_coverage)](https://codeclimate.com/github/ozimos/Book-A-Meal/test_coverage)

## What the project does

Book-A-Meal is an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

## Why the project is useful

Given you manage a catering business, this app will help you manage meals and menus, and will enable customers to make bookings and show a dashboard summary of bookings made and profits accrued.

## Features

### Caterer (Admin)

* manage meals (create, modify, delete)
* manage menu (create, modify, delete) for specific day
* view summary and details of orders for specific day

### All Users

* sign up and sign in
* place a meal order from the menu for a specific day

API Endpoints

* Get All Meals  - GET /api/v1/meals
* Add a Meal  - POST /api/v1/meals
* Update a Meal  - PUT /api/v1/meals/:mealId
* Delete - DELETE /api/v1/meals/:mealId
* Get the menu for the day - GET /api/v1/menu
* Setup the menu for the day - POST /api/v1/menu
* Get All Orders  - GET /api/v1/orders
* Select the meal option from the menu  - POST /api/v1/orders
* Modify an order  - PUT /api/v1/orders/:orderId

## Getting Started

* [View UI Templates](<https://ozimos.github.io/Book-A-Meal/UI> "Github Project Hosting")
* [View the application server side hosted on Heroku](https://book-a-meal-andela-31.herokuapp.com/)

* [Track progress on application features with Pivotal Tracker](<https://www.pivotaltracker.com/n/projects/2165548> "Pivotal Tracker Project")
* Requirements

  * Back-end: Node/Expressjs
  * Libraries: ES6, Babel-CLI, eslint, Mocha/Chai, Postman

* How to setup the project/Installation/Configuration

  * Clone or download the repo
  * npm install - to install the dependencies need by the app
  * npm run start - to run the app

* How to run tests
  * Setup the app as detailed above
  * npm run test - to test the app
  * Using Postman import this endpoint collection link <https://www.getpostman.com/collections/85eee7927738b7112a13>
  * Test the API Endponts with Postman
