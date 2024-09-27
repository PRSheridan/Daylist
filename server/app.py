#!/usr/bin/env python3

from flask import make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Calendar, Calendar_Relationship, Note

@app.route('/')
def index():
    return ''

#check if there is a user_id for the current session
class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id']).first().to_dict()
            return user, 200
        return {'error': '401 Unauthorized Request'}, 401

#receive username, password, confirmation: 
#   if passwords do not match throw error
#   try creating a new User, hash password, commit changes 
class Signup(Resource):
    def post(self):
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
        passwordConfirm = json.get('passwordConfirm')

        if password != passwordConfirm:
            return {'error': '401 Passwords do not match'}, 401

        try:
            user = User(username = username)
            user.password_hash = password

            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        
        except IntegrityError:
            return {'error': '422 Cannot process request'}, 422

#receive username, password
#   if the username exists, and authenticated password matches
class Login(Resource):
    def post(self):
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        
        return {'error': '401 Unauthorized login'}, 401

#clear session['user_id']
class Logout(Resource):
    def delete(self):
        if session['user_id']:
            session['user_id'] = ''
            return {}, 204
        return {'error':'401 Unable to process request'}, 401


class CalendarIndex(Resource):

#if there is a current user, get user
#   add calendar_list object for each calendar in the users calendars
#   *uses association object for user.calendars
    def get(self):
        if user_id := session['user_id']:
            user = User.query.filter(User.id == user_id).first()
            calendar_list = [{'id': calendar.id, 'title': calendar.title}
                              for calendar in user.calendars if calendar is not None]
            return calendar_list, 200

        return {'error': '401 Unauthorized request'}, 401

#if there is a current user, get data
#   try creating a new Calendar and commit changes
#   if the calendar is created, try creating a new relationship as owner and commit changes
    def post(self):
        if session['user_id']:
            data = request.get_json()
            title = data['title']

        try:
            calendar = Calendar(title = title)
            db.session.add(calendar)
            db.session.commit()

            if calendar := Calendar.query.filter(Calendar.title == title).first().to_dict():
                try: 
                    relationship = Calendar_Relationship(
                        user_id = session['user_id'],
                        calendar_id = calendar["id"],
                        permission = 'owner'
                    )
                    db.session.add(relationship)
                    db.session.commit()

                except IntegrityError:
                    return {'error':'422 cannot process request'}, 422

                return calendar, 201
        
        except IntegrityError:
            return {'error':'422 cannot process request'}, 422

class CalendarByID(Resource):

#if calendar id exists, return calendar
    def get(self, id):
        if session['user_id']:
            calendar = Calendar.query.filter(Calendar.id == id).one_or_none()
            if calendar is None:
                return make_response({'error': 'Calendar not found'}, 404)
            return make_response(calendar.to_dict(), 200)

#UPDATE CALENDAR
#if current user, get data and current-calendar by id
#   try updating existing calendar, commit changes
    def post(self, id):
        if session['user_id']:
            data = request.get_json()
            calendar = Calendar.query.filter(Calendar.id == id).one_or_none()

        try:
            calendar.title = data['title']
            db.session.commit()
            return calendar.to_dict(), 200
        
        except IntegrityError:
            return {'error':'422 cannot process request'}, 422
        
#if current user, get current-relationship
#   if user is an owner, delete the current-calendar
    def delete(self, id):
        if user_id := session['user_id']:
            calendar_relationship = Calendar_Relationship.query.filter(
                        Calendar_Relationship.user_id == user_id and
                        Calendar_Relationship.calendar_id == id).first()
        
        if calendar_relationship.permission != "owner":
            return make_response({'error': 'User does not have permission to access this resource'}, 403)
            
        if user_id and (calendar := Calendar.query.filter(Calendar.id == id).one_or_none()):
            db.session.delete(calendar)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({'error': 'Calendar not found'}, 404)


class CalendarRelationshipByID(Resource):

#if calendar exists
#   for calendar.users, find username and relationship permission level
#   add to shared_users Object
    def get(self, calendarID):
        if session['user_id']:
            if calendar := Calendar.query.filter(Calendar.id == calendarID).first():
                shared_users = [user.username +": " + Calendar_Relationship.query.filter(
                                    Calendar_Relationship.user_id == user.id and
                                    Calendar_Relationship.calendar_id == calendarID).first().permission
                                for user in calendar.users]
                
        return shared_users, 200

#if current user, get data and find other user (to share with)
#   try creating a new relationship, commit changes
    def post(self, calendarID):
        if session['user_id']:
            data = request.get_json()
            new_user = User.query.filter(User.username == data['username']).one_or_none()

        if new_user is None:
            return make_response({'error': 'Username not found'}, 404)
        
        try:
            calendar_relationship = Calendar_Relationship(
                user_id=new_user.id,
                calendar_id=calendarID,
                permission=data['permission']
            )

            db.session.add(calendar_relationship)
            db.session.commit()
            return calendar_relationship.to_dict(), 200
        
        except IntegrityError:
            return {'error':'422 cannot process request'}, 422

        
class NoteByCalendarID(Resource):

#if current user, get note for current-calendar
    #return note_list of formatted note objects
    def get(self, calendarID):
        if session['user_id']:
            notes = Note.query.filter(Note.calendar_id == calendarID).all()

        note_list = [{'id': note.id, 'year': note.year, 'month': note.month, 'day': note.day,
                      'title': note.title, 'content': note.content} for note in notes]
        return note_list, 200

#if current user, get data (format data)
#   try creating new Note, commit changes
    def post(self, calendarID):
        if session['user_id']:
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

#UPDATE NOT E
#if note exists and current user, get data
#   try updating the existing note with new data, commit changes
    def post(self, noteID):
        if session['user_id']:
            if currentNote := Note.query.filter(Note.id == noteID).one_or_none():
                if currentNote is None:
                    return make_response({'error': 'Note not found'}, 404)
                data = request.get_json()

        try:
            currentNote.year = data['year']
            currentNote.month = data['month']
            currentNote.day = data['day']
            currentNote.title = data['title']
            currentNote.content = data['content']

            db.session.add(currentNote)
            db.session.commit()

            return currentNote.to_dict(), 200
        
        except IntegrityError:
            return {'error':'422 cannot process request'}, 422
        
# if note exists and current user
#   delete note
    def delete(self, noteID):
        if session['user_id']:
            if note := Note.query.filter(Note.id == noteID).one_or_none():
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
api.add_resource(CalendarRelationshipByID, '/share/<int:calendarID>')
api.add_resource(NoteByCalendarID, '/calendar_notes/<int:calendarID>')
api.add_resource(NoteByID, '/note/<int:noteID>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

