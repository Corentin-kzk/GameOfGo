from mongoengine import Document, fields


class User(Document):
    first_name = fields.StringField(required=True)
    last_name = fields.StringField(required=True)
