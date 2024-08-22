from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    #relationships
    #many users have many calendars

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes cannot be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        passwrd_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}'


class Calendar(db.Model, SerializerMixin):
    __tablename__ = 'calendars'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=True)

    #relationships
    #many users have many calendars
    #one calendar has many notes


class User_Calendar(db.Model, SerializerMixin):
    __tablename__ = 'user_calendars'

    pass
    #relationships


class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    date = db.Column(db.Date)

    #relationships
    #one calendar has many notes


class Reminder(db.Model, SerializerMixin):
    __tablename__ = 'reminders'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    repeating = db.Column(db.String)

    #relationships
    #one calendar has many reminders