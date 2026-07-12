from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, ContactMessage

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("", methods=["POST"])
def submit_message():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "name, email and message are required"}), 400

    msg = ContactMessage(name=name, email=email, message=message)
    db.session.add(msg)
    db.session.commit()

    # Optional: hook in an email notification here (e.g. SendGrid) so you
    # get pinged the moment a recruiter/visitor messages you.

    return jsonify({"success": True}), 201


@contact_bp.route("", methods=["GET"])
@jwt_required()
def list_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify([m.to_dict() for m in messages])


@contact_bp.route("/<int:message_id>/read", methods=["PATCH"])
@jwt_required()
def mark_read(message_id):
    msg = ContactMessage.query.get_or_404(message_id)
    msg.read = True
    db.session.commit()
    return jsonify(msg.to_dict())
@contact_bp.route("/<int:message_id>", methods=["DELETE"])
@jwt_required()
def delete_message(message_id):
    msg = ContactMessage.query.get_or_404(message_id)
    db.session.delete(msg)
    db.session.commit()
    return jsonify({"deleted": message_id})
