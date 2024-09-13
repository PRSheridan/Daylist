#!/usr/bin/env python3
from app import app
from models import db, User, Calendar, User_Calendar, Note, Reminder

if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Calendar.query.delete()
        User_Calendar.query.delete()
        Note.query.delete()
        Reminder.query.delete()
        db.session.commit()

        print("Database seeded successfully!")
