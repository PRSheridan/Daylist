#!/usr/bin/env python3

# Standard library imports
from datetime import date
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Calendar, User_Calendar, Note, Reminder

if __name__ == '__main__':
    
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Calendar.query.delete()
        User_Calendar.query.delete()
        Note.query.delete()
        Reminder.query.delete()

        # Create sample users
        users = []
        user1 = User(username='Philip Sheridan')
        user1.password_hash = 'examplepassword'
        user2 = User(username='Sky Rousseau')
        user2.password_hash = 'passwordexample'
        user3 = User(username='Christian Sommers')
        user3.password_hash = 'testpassword'
        user4 = User(username='Charles Stumpf')
        user4.password_hash = 'passwordtest'
        users.extend((user1, user2, user3, user4))

        # Create sample calendars
        calendars = []
        calendar1 = Calendar(title="Phil's Calendar")
        calendar2 = Calendar(title="Charles' Calendar")
        calendar3 = Calendar(title="Sky's Calendar")
        calendar4 = Calendar(title='Team Calendar')
        calendar5 = Calendar(title='Test Calendar')
        calendars.extend((calendar1, calendar2, calendar3, calendar4, calendar5))
        

        # Create sample user_calendar associations
        user_calendars = []
        user_calendar1 = User_Calendar(user=user1, calendar=calendar1)
        user_calendar2 = User_Calendar(user=user4, calendar=calendar2)
        user_calendar3 = User_Calendar(user=user2, calendar=calendar3)
        user_calendar4 = User_Calendar(user=user1, calendar=calendar4)
        user_calendar5 = User_Calendar(user=user2, calendar=calendar4)
        user_calendar6 = User_Calendar(user=user3, calendar=calendar4)
        user_calendar4 = User_Calendar(user=user4, calendar=calendar4)
        user_calendar5 = User_Calendar(user=user1, calendar=calendar5)
        user_calendar6 = User_Calendar(user=user2, calendar=calendar5)
        user_calendars.extend((user_calendar1, user_calendar2, user_calendar3, user_calendar4, user_calendar5, user_calendar6))

        # Create sample notes
        notes = []
        note1 = Note(calendar=calendar1, date=date(2024, 8, 20), title='Phase-4 Project', content='Worked on Phase-4 Project for 10 hours')
        note2 = Note(calendar=calendar2, date=date(2024, 8, 18), title='Scrapbook', content='Scrapbooked for an hour')
        note3 = Note(calendar=calendar3, date=date(2024, 8, 23), title='Overwatch', content='Played competetive for 3 hours')
        note4 = Note(calendar=calendar4, date=date(2024, 8, 19), title='Team Meeting', content='Discussed project changes for 30 minutes')
        note5 = Note(calendar=calendar5, date=date(2024, 8, 22), title='Date Night', content='Went out to dinner')
        note6 = Note(calendar=calendar1, date=date(2024, 8, 17), title='Excecise', content='25 curls')
        note7 = Note(calendar=calendar1, date=date(2024, 8, 17), title='Diet', content='breakfast sammy, coffee, granola bar, banana, chicken and rice')
        note8 = Note(calendar=calendar1, date=date(2024, 8, 17), title='Work', content='18 tickets updated')
        notes.extend((note1, note2, note3, note4, note5, note6, note7, note8))

        # Create sample reminders
        reminders = []
        reminder1 = Reminder(calendar=calendar1, date=date(2024, 8, 26), content='Meeting reminder', repeating='Every Friday')
        reminder2 = Reminder(calendar=calendar2, date=date(2024, 8, 25), content='Doctor appointment reminder', repeating='None')
        reminder3 = Reminder(calendar=calendar3, date=date(2024, 8, 27), content='Work reminder', repeating='Weekly')
        reminder4 = Reminder(calendar=calendar4, date=date(2024, 8, 26), content='Scrum', repeating='Monday, Wednesday, Friday')
        reminder5 = Reminder(calendar=calendar5, date=date(2024, 8, 24), content='Dinner plans', repeating='None')
        reminder6 = Reminder(calendar=calendar1, date=date(2024, 8, 28), content='Dailys', repeating='Daily')
        reminders.extend((reminder1, reminder2, reminder3, reminder4, reminder5, reminder6))

        # Add the records to the session
        db.session.add_all(users)
        db.session.add_all(calendars)
        db.session.add_all(user_calendars)
        db.session.add_all(notes)
        db.session.add_all(reminders)

        # Commit the session to the database
        db.session.commit()

        print("Database seeded successfully!")
