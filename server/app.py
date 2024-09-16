#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Calendar, User_Calendar, Note, Reminder

@app.route('/')
def index():
    return ''

class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id']).first().to_dict()
            return user, 200
        return {'error': '401 Unauthorized Request'}, 401

class Signup(Resource):
    def post(self):
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
        passwordConfirm = json.get('passwordConfirm')

        if password != passwordConfirm:
            return {'error': '401 Passwords do not match'}, 401

        user = User(username = username)
        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        
        except IntegrityError:
            return {'error': '422 Cannot process request'}, 422

class Login(Resource):
    def post(self):
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
            
        return {'error':'401 Unauthorized login'}, 401

class Logout(Resource):
    def delete(self):
        if session['user_id']:
            session['user_id'] = ''
            return {}, 204
        return {'error':'401 Unable to process request'}, 401

class CalendarIndex(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user_calendars = User_Calendar.query.filter_by(user_id=user_id).all()
            calendar_ids = [cal.calendar_id for cal in user_calendars]
            calendars = Calendar.query.filter(Calendar.id.in_(calendar_ids)).all()
            calendar_list = [{'id': calendar.id, 'title': calendar.title} for calendar in calendars]
            return calendar_list, 200

        return {'error': '401 Unauthorized request'}, 401
    
    def post(self):
        if session['user_id']:
            json = request.get_json()
            title = json['title']

        try:
            calendar = Calendar(title = title)

            db.session.add(calendar)
            db.session.commit()

            calendar = Calendar.query.filter(Calendar.title == title).first().to_dict()

            relationship = User_Calendar(
                user_id = session['user_id'],
                calendar_id = calendar["id"],
            )

            db.session.add(relationship)
            db.session.commit()

            return calendar, 201
        
        except IntegrityError:
            return {'error':'422 cannot process request'}, 422

class CalendarByID(Resource):
    def get(self, id):
        user_id = session.get('user_id')
        if user_id:
            calendar = Calendar.query.filter(Calendar.id == id).one_or_none()
            if calendar is None:
                return make_response({'error': 'Calendar not found'}, 404)
            return make_response(calendar.to_dict(), 200)
        
    def delete(self, id):
        user_id = session.get('user_id')
        if user_id:
            calendar = Calendar.query.filter(Calendar.id == id).one_or_none()
            if calendar is None:
                return make_response({'error': 'Calendar not found'}, 404)
            db.session.delete(calendar)
            db.session.commit()
            return make_response({}, 204)
        
class NoteByCalendarID(Resource):
    def get(self, calendarID):
        notes = Note.query.filter(Note.calendar_id == calendarID).all()
        note_list = [{'id': note.id, 'year': note.year, 'month': note.month, 'day': note.day,
                      'title': note.title, 'content': note.content} for note in notes]
        return note_list, 200

    def post(self, calendarID):
        data = request.get_json()
        year = data['year']
        month = data['month']
        day = data['day']
        title = data['title']
        content = data['content']

        try:
            note = Note(
                year=year,
                month=month,
                day=day,
                title=title,
                content=content,
                calendar_id=calendarID
            )

            db.session.add(note)
            db.session.commit()

            return note.to_dict(), 200
        except IntegrityError:
            return {'error':'422 cannot process request'}, 422
        
class NoteByID(Resource):
    def get(self, noteID):
        note = Note.query.filter(Note.id == id).one_or_none()
        if note is None:
            return make_response({'error': 'Note not found'}, 404)
        return note, 200

    def delete(self, noteID):
        note = Note.query.filter(Note.id == id).one_or_none()
        if note is None:
            return make_response({'error': 'Note not found'}, 404)
        db.session.delete(note)
        db.session.commit()
        return make_response({}, 204)
        

api.add_resource(CheckSession, '/check_session')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CalendarIndex, '/calendars')
api.add_resource(CalendarByID, '/calendar/<int:id>')
api.add_resource(NoteByCalendarID, '/calendar_notes/<int:calendarID>')
api.add_resource(NoteByID, '/note/<int:noteID>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

