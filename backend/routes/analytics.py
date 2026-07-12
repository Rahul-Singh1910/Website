from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import func
from models import db, Visit

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/visit", methods=["POST"])
def log_visit():
    data = request.get_json() or {}
    visit = Visit(page=data.get("page", "/"), resume_variant=data.get("resume_variant"))
    db.session.add(visit)
    db.session.commit()
    return jsonify({"logged": True}), 201


@analytics_bp.route("/stats", methods=["GET"])
@jwt_required()
def stats():
    total_visits = Visit.query.count()
    resume_downloads = (
        db.session.query(Visit.resume_variant, func.count(Visit.id))
        .filter(Visit.resume_variant.isnot(None))
        .group_by(Visit.resume_variant)
        .all()
    )
    return jsonify({
        "total_visits": total_visits,
        "resume_downloads": {variant: count for variant, count in resume_downloads},
    })
