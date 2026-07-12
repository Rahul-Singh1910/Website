from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, Admin

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    admin = Admin.query.filter_by(username=username).first()
    if not admin or not admin.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=admin.username)
    return jsonify({"access_token": token, "username": admin.username})
