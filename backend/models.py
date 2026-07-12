from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack = db.Column(db.String(300))  # comma-separated
    github_url = db.Column(db.String(300))
    live_url = db.Column(db.String(300))
    image_url = db.Column(db.String(300))
    featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "tech_stack": self.tech_stack.split(",") if self.tech_stack else [],
            "github_url": self.github_url,
            "live_url": self.live_url,
            "image_url": self.image_url,
            "featured": self.featured,
            "order": self.order,
            "created_at": self.created_at.isoformat(),
        }


class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(220), unique=True, nullable=False)
    content_md = db.Column(db.Text, nullable=False)
    published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self, full=True):
        data = {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "published": self.published,
            "created_at": self.created_at.isoformat(),
        }
        if full:
            data["content_md"] = self.content_md
        return data


class ContactMessage(db.Model):
    __tablename__ = "contact_messages"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "read": self.read,
            "created_at": self.created_at.isoformat(),
        }


class Visit(db.Model):
    __tablename__ = "visits"
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(150))
    resume_variant = db.Column(db.String(50), nullable=True)  # e.g. "fintech" / "it_services"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Experience(db.Model):
    __tablename__ = "experience"
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(150), nullable=False)
    duration = db.Column(db.String(100), nullable=False)  # e.g. "Nov 2024 - Jul 2025"
    description = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "role": self.role,
            "company": self.company,
            "duration": self.duration,
            "description": self.description,
            "order": self.order,
        }
