from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db

from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.blog import blog_bp
from routes.contact import contact_bp
from routes.analytics import analytics_bp
from routes.experience import experience_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)
    CORS(app, origins=app.config["CORS_ORIGINS"], supports_credentials=True)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")
    app.register_blueprint(blog_bp, url_prefix="/api/blog")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(analytics_bp, url_prefix="/api/analytics")
    app.register_blueprint(experience_bp, url_prefix="/api/experience")

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
