from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-calendar_relationships.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    calendar_relationships = db.relationship('Calendar_Relationship', back_populates='user')

    calendars = association_proxy('calendar_relationships', 'calendar',
                                  creator=lambda calendar_obj: Calendar_Relationship(calendar=calendar_obj))

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes cannot be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        print(f'Encrypting password: {self.username}')
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        print(f'Authenticating user: {self.username}')
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.id, self.username}>'


class Calendar(db.Model, SerializerMixin):
    __tablename__ = 'calendars'
    serialize_rules = ('-calendar_relationships.calendar',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(24), nullable=False)

    notes = db.relationship('Note', backref='calendar', cascade='all, delete-orphan')
    calendar_relationships = db.relationship('Calendar_Relationship', back_populates='calendar', cascade='all, delete-orphan')

    users = association_proxy('calendar_relationships', 'user',
                              creator=lambda user_obj: Calendar_Relationship(user=user_obj))

    def __repr__(self):
        return f'<Calendar {self.title}>'


class Calendar_Relationship(db.Model, SerializerMixin):
    __tablename__ = 'calendar_relationships'
    serialize_rules = ('-user.calendar_relationships', '-calendar.calendar_relationships')

    id = db.Column(db.Integer, primary_key=True)
    permission = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    calendar_id = db.Column(db.Integer, db.ForeignKey('calendars.id'))

    user = db.relationship('User', back_populates='calendar_relationships')
    calendar = db.relationship('Calendar', back_populates='calendar_relationships')

    def __repr__(self):
        return f'<Calendar_Relationship {self.calendar_id, self.user_id, self.permission}>'


class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'

    serialize_only = ('id', 'year', 'month', 'day', 'title', 'content', 'calendar_id')

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String)

    calendar_id = db.Column(db.Integer, db.ForeignKey('calendars.id'), nullable=False)

    def __repr__(self):
        return f'<Note {self.title, self.year, self.month, self.day}>'

