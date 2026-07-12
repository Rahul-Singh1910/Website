from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Experience

experience_bp = Blueprint("experience", __name__)


@experience_bp.route("", methods=["GET"])
def list_experience():
    items = Experience.query.order_by(Experience.order).all()
    return jsonify([e.to_dict() for e in items])


@experience_bp.route("", methods=["POST"])
@jwt_required()
def create_experience():
    data = request.get_json() or {}
    e = Experience(
        role=data.get("role"),
        company=data.get("company"),
        duration=data.get("duration"),
        description=data.get("description"),
        order=data.get("order", 0),
    )
    db.session.add(e)
    db.session.commit()
    return jsonify(e.to_dict()), 201


@experience_bp.route("/<int:exp_id>", methods=["PUT"])
@jwt_required()
def update_experience(exp_id):
    e = Experience.query.get_or_404(exp_id)
    data = request.get_json() or {}
    for field in ["role", "company", "duration", "description", "order"]:
        if field in data:
            setattr(e, field, data[field])
    db.session.commit()
    return jsonify(e.to_dict())


@experience_bp.route("/<int:exp_id>", methods=["DELETE"])
@jwt_required()
def delete_experience(exp_id):
    e = Experience.query.get_or_404(exp_id)
    db.session.delete(e)
    db.session.commit()
    return jsonify({"deleted": exp_id})
