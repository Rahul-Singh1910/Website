"""
One-time use: updates your admin password without touching any other data.
Usage: python change_password.py
"""
from app import create_app
from models import db, Admin

NEW_PASSWORD = "Rahul@1910"

app = create_app()

with app.app_context():
    admin = Admin.query.filter_by(username="rahul").first()
    if not admin:
        print("No admin user found named 'rahul'.")
    else:
        admin.set_password(NEW_PASSWORD)
        db.session.commit()
        print("Password updated successfully.")