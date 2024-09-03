from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    #relationships: many users have many calendars
    calendars = db.relationship('User_Calendar', back_populates='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes cannot be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
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
    title = db.Column(db.String, unique=True, nullable=False)

    #relationships: many users have many calendars, one calendar has many notes
    users = db.relationship('User_Calendar', back_populates='calendar')
    notes = db.relationship('Note', backref='calendar')
    reminders = db.relationship('Reminder', backref='calendar')

    def __repr__(self):
        return f'<User {self.title}'


class User_Calendar(db.Model, SerializerMixin):
    __tablename__ = 'user_calendars'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    calendar_id = db.Column(db.Integer, db.ForeignKey('calendars.id'), primary_key=True)

    #relationships: connect users and calendars
    user = db.relationship('User', back_populates='calendars')
    calendar = db.relationship('Calendar', back_populates='users')


class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String)

    #relationships: one calendar has many notes
    calendar_id = db.Column(db.Integer, db.ForeignKey('calendars.id'), nullable=False)

    def __repr__(self):
        return f'<User {self.title, self.date}'


class Reminder(db.Model, SerializerMixin):
    __tablename__ = 'reminders'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    content = db.Column(db.String, nullable=False)
    repeating = db.Column(db.String)

    #relationships: one calendar has many reminders
    calendar_id = db.Column(db.Integer, db.ForeignKey('calendars.id'), nullable=False)

    def __repr__(self):
        return f'<User {self.content, self.date}'