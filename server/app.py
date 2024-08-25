#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Calendar, Note, Reminder

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id'].first())
            return user.to_dict(), 200
        return {'error': '401 Unauthorized Request'}, 401

class Signup(Resource):
    def post(self):
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
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
                return user.to_dict()
        return {'error': '401 Unauthorized login'}, 401

class Logout(Resource):
    pass

class User(Resource):
    pass

class UserByID(Resource):
    pass

class Calendar(Resource):
    pass

class CalendarByID(Resource):
    pass

class NoteByID(Resource):
    pass

class ReminderByID(Resource):
    pass


api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

