# Final Fantasy XIV Gathering Companion

[![Build Status](https://travis-ci.com/RyanEllingson/ffxiv-gathering-companion.png?branch=master)](https://travis-ci.com/RyanEllingson/ffxiv-gathering-companion)

Check out the deployed app at https://ffxiv-gathering-companion.herokuapp.com/

This app is intended to help gatherers in Final Fantasy XIV locate unspoiled and ephemeral botany and mining nodes, as well as alert them when desired items are available to be gathered in-game.  The app is especially designed to help users plot out intense gathering sessions involving multiple unspoiled or ephemeral nodes (for farming gatherers' scrips for example) by allowing users to create "alarms" for any number of different items and displaying them in the order in which they will next become available to gather.

## Using the App

Upon loading the app, the user is directed to the home page.  The navbar, visible on all pages of this app, has an in-game clock displaying the current time of day in Eorzea, the world of Final Fantasy XIV.

![screenshot 1](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot1.JPG)

Any user may may view the in-game clock, as well as search for information on any unspoiled or ephemeral gathering node, without creating an account.  However, logged-in users may choose specific gathering nodes and set up alarms, which let the user know which nodes are currently available to gather, and what nodes are coming up.  A new user may create an account by clicking the "Register" link on the navbar.  If there are any problems with the information entered by the user when they click "Submit," such as missing field, passwords not matching, etc., these errors will be displayed on the form.

![screenshot 2](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot2.JPG)

If a user has already registered an account with the app, they may log in by clicking the "Login" link on the navbar.  Again, any problems with the user's input will be displayed on the form when they click "Submit."

![screenshot 3](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot3.JPG)

Upon successfully registering an account or logging in, the user is redirected back to the home page.  A message displaying the currently logged-in user's email is shown in the navbar, and the links in the navbar change as well.  Now there is a "View Alarms" link and a "Logout" link, and the "Register" and "Login" links are not shown.

![screenshot 4](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot4.JPG)

Clicking on the "Find Items" link brings the user to the items page.  Here the user may either see all the gatherable items in the app's database, find all of the either botany or mining nodes, or search for particular items by name.  Clicking the "Open search form" button will reveal the search field and button.  Partial searches work for this as well.

![screenshot 5](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot5.JPG)

Any user may search for items whether they are logged in or not.  However, if the user is logged in they will see the "Add alarm" button in the top right of each item card.  Clicking this will open a form that prompts the user to enter a note they would like associated with that item.  The intended use case for this is the collectability the user is targeting, but the user may put anything else or nothing at all.  Clicking the "Create alarm" button on this form will add an alarm for that user for the selected item.

![screenshot 6](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot6.JPG)

If a logged-in user clicks on the "View Alarms" link on the navbar, they will be directed to the alarms page of the app.  The alarms page displayes all the alarms that user has entered into the database.  At the top of the screen, the user will see all of their items that are currently available to be gathered in the container with the "Ready to Gather!" header.  Below that, all of the user's other alarms are displayed arranged in the order they will next become available.  Additionally, each alarm has a "Delete alarm" button in the upper right corner that, when clicked, deletes the alarm from the database.

![screenshot 7](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot7.JPG)

## Techniques and Technologies Used

The Final Fantasy XIV Gathering Companion is a full-stack web application featuring a React front-end, a Node.js back-end utilizing an Express web server, and a MySQL database storing data on users, items, and alarms.

Routing on the front end is handled using React Router.  The front-end is built using functional components, together with the useState, useEffect, and useContext hooks.  Context is used to distribute both the currently logged-in user and the in-game time throughout the application.  Axios is used to send HTTP requests to the back-end server.

On the back-end, the mysql module is used to connect with the application database.  All database queries are organized in an ORM file, and are specifically called in response to receiving requests at the defined routes.  Each and every function in the ORM is rigorously tested using Jest, with the test file utilizing a dedicated MySQL test database to ensure reads, writes, and deletes occur as expected.  The repo for this project is also configured to utilize Travis CI, so all tests are required to pass before any update is allowed to be merged into the production code.  Below is a snip showing some of the tests required to pass for this application:

![screenshot 8](https://github.com/RyanEllingson/ffxiv-gathering-companion/blob/master/assets/images/screenshot8.JPG)

User authentication is handled with a cookie-based strategy.  The cookie-session node module is utilized, and any time a user either registers or logs in to the application on the front-end, the server puts a cookie with an encrypted form of the user's id onto the client's browser.  Encryption is handled by both the cookie-session code as well as performing a hash on the id beforehand.  The functions for adding or deleting alarms for a given user first check whether the appropriate cookie was sent with the request, guaranteeing that users may only modify their own alarms.

In order to securely store users' login information, during user registration the password submitted by the user is salted and hashed.  The salt is randomly generated for each user, and this salt is stored along with the hashed password in the users table.  When attempting to log in, the salt for the requested user is retrieved and this salt along with the password provided by the user is passed through the hashing algorithm again to ensure it is a match with the hashed password stored in the database.

The back-end server is set up as a RESTful API, configured to handle GET, POST, and DELETE requests.  The route that retrieves data from the items table does not, at this time, require user authentication, and so a web browser or other platform that can send HTTP requests can request the information compiled in this table and the API will send back the requested data as JSON.