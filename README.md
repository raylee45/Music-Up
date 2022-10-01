# Tune Up

Connect with people that share common favorite artists/songs with you while keeping track of all your favorite artists/songs all in your personal profile!
Tune Up is a CRUD RESTful API application, in which utilizses Node.js, Express.js and POSTgreSQL Explorer. Tune Up obtains all data from 
Shazam API, in which provides REST API endpoints that exposes all of Shazam's features.

All the tech stacks that are used in this application are:
HTML, CSS, JavaScript, Axios, PostgreSQL, Sequelize, Express, Node and EJS.

## Shazam API
How to obtain Shazam API key: https://rapidapi.com/apidojo/api/shazam/

## WireFrame
![Wireframe](https://user-images.githubusercontent.com/107227057/191876095-8720764f-5fec-47df-b1ff-cc2c18cd526a.png)
## ERD (Entity Relationship Diagram)
![ERD](https://user-images.githubusercontent.com/107227057/191876123-cdbc1d4e-4d61-4cd2-8eb4-67f5799fd85b.png)

## How To Use
- This application utilizes the Shazam API via REST principles in order to return JSON metadata from the Shazam's API database. 
- A site user will be able to use the application after going through user authentication by signing up and/or logging in via email and password. 
- Each user will have their own individual profile with their saved favorite songs and artists. 
- Within their favorited songs, users are able to comment and also view other users' comments to that specific song. This allows users to connect with each other based off of the songs that they similarly favorited.

## How to Set up/Install
1. Go to https://github.com/raylee45/Tune-Up and git clone.

2. In your terminal: 
    cd supreme-engine
    npm install
    touch .env

3. Add and add SECRET_SESSION=alldayidreamaboutsoftwareengineering inside of .env file

4. For API key:
    - Go to https://rapidapi.com/apidojo/api/shazam/
    - Add to .env file: APIkey=b94407a4e5msh62abba97a6403f5p1726b9jsn6d78e721524e

5. In your terminal:
    create the database
    npm install sequelize-cl
    npx sequelize-cli db:create supreme-engine

6. Migrate the database:
    npx sequelize-cli db:migrate

7. Start the server!
    npm start