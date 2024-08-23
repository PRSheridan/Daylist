#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Calendar, Note, Reminder

if __name__ == '__main__':
    
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        print("Deleting previous records...")
        Calendar.query.delete()
        User.query.delete()

        print('Creating users...')
        users = []
        usernames = []

        for i in range(20):
            
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username,)

            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)   

        print('Creating calendars...')
        calendars = []
        titles = []

        for i in range(10):

            title = fake.job()
            while title in titles:
                title = fake.job()
            titles.append(title)

            calendar = Calendar(title=title)
            calendars.append(calendar)

        db.session.add_all(calendars)
