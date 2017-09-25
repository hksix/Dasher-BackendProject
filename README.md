# Dasher

![alt text](splashpage.png "Splash image")


## Overview:
Dasher is a Node.js/Express server-rendered, customizable dashboard application. Handlebars partials were used to render the front-end views. The user can login using GitHub authentication. Dasher offers the user a choice of widgets (i.e. weather, calendar, news) that they can customize and save to their preferences. Settings are stored in a PostgreSQL database. Additions will be made in React.    

## Built by:

[Stephanie Asmar](https://github.com/stephanieasmar)  
Contributions: Express routing, PostgreSQL database initiation, UI design

[Jennifer Li Johnson](https://github.com/jenlij)  
Contributions: Amazon Web Services EC2 DevOps, Layout implementation, Widget creation, Querying user preferences

[Hamza Haseeb](https://github.com/hksix)
Contributions: User authentication, Widget creation, Saving user preferences, Express routing

## Built with:

* Node.js
* Express
* Handlebars
* PostgreSQL 
* Passport user authentication
* JavaScript/jQuery
* CSS
* React (coming soon)

## (Minimum Viable Product):
* A simple, customizable dashboard/personal assistant
* User login with GitHub authentication

## Upcoming goals:
* Casting the dashboard behind a one-way mirror via Rasberry Pi
* Adding React-based widgets 

<h2><u>Code Snippets:</u></h2>
<h4>The code below showcases the Github Authorization process:</h4>
<img src="images/ReadMe Snippets/Github-OAuth.png" alt="Github-OAuth Code Snippet">
<br/>
<h4>The code below showcases the scripts use to create the main dashboard routes:</h4>
<img src="images/ReadMe Snippets/Dashboard.png" alt="Dashboard Code Snippet">
<br/>
<h4>The code below showcases the scripts used to save user settings to the database:</h4>
<img src="images/ReadMe Snippets/UserSettings.png" alt="User Settings Code Snippet">
<br/>

<h2>Live Demo</h2>
https://www.dasherpi.com
</br>

<h2>Screenshots:</h2>
<h4>Dasher splash page:</h4>
<img src="images/splashpage.png" alt="Dasher Landing Page">
<br />
<h4>Github User Authentication:</h4>
<img src="images/dasher.png" alt="Dasher Dashboard Page">
<br />
<h4>User Dashboard:</h4>
<img src="images/authentication.png" alt="Dasher Dashboard Page">
