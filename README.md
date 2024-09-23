# DayList:

Daylist is a full-stack application that allows users create calendars to take note of their daily tasks. A user can have any number of calendars for different tasks, and calendars can be shared between users for joint plans. 
Calendars display as expected. Clicking a day displays all notes associated with that day. Notes can be edited, moved or deleted. Similarly, calendars can be edited, shared, or deleted. 

This project integrates the following features:
- A React frontend for easy, intuitive navigation.
- A Flask REST API for backend data management, and organization.
- Secure authenticated logins.
- Customizable calendars, and easy sharing between users.

-gifs here-

## Technologies Used:

### Frontend

- **Next.js**: A React framework for building fast, server-side-rendered applications.
- **Formik**: A React library for managing forms.

### Backend

- **Flask**: Python micro-framework used to build RESTful APIs.
- **SQLAlchemy**: ORM (Object Relational Mapper) for database management.
- **Flask-RESTful**: Flask extension for creating REST APIs.
- **Flask-Bcrypt**: For password hashing.
- **Flask-Migrate**: For handling database migrations.

## Setup

1. Clone the repository
`git clone https://github.com/PRSheridan/DayList/`

2. Create a virtual environment and install dependencies:
`pipenv install`
`pipenv shell`

3. Run the Flask server from the server directory (`cd server`):
`python app.py`

The backend server should now be running on http://localhost:5555.

4. Install dependencies:
`npm install --prefix client`

5. Run the React application:
`npm start --prefix client`

The frontend should now be running on http://localhost:4000.

6. Initialize and upgrade the database from the server directory (`cd ../server`):
`flask db init`
`flask db migrate -m "Initial migration"`
`flask db upgrade`

## Models:

#### User
- id: Primary key.
- username: unique username
- _password_hash: Encrypted user password
- calendars: Calendars assigned to user

#### Calendar
- id: Primary key.
- title: User defined title.
- users: Users the calendar has been shared with.
- notes: Notes associated with the calendar.

#### Note
- id: Primary key.
- year: Note year.
- month: Note month.
- day: Note day.
- title: User defined title of the note.
- content: User defined body of the note.

#### User_Calendar
- user_id: Primary key.
- calendar_id: Primary key.
- permission: Permission level of the user to the calendar (read-only / owner).

## Future Plans:

There are many additions/extensions that could be added to this application:
- sharing notes
- user profile (picture, information...)
- different note types (lists, images...)

##Contact Me:

PRSheridan (github.com)
philrsheridan@gmail.com
