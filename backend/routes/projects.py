from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Project

projects_bp = Blueprint("projects", __name__)


@projects_bp.route("", methods=["GET"])
def list_projects():
    projects = Project.query.order_by(Project.order, Project.created_at.desc()).all()
    return jsonify([p.to_dict() for p in projects])


@projects_bp.route("/<int:project_id>", methods=["GET"])
def get_project(project_id):
    p = Project.query.get_or_404(project_id)
    return jsonify(p.to_dict())


@projects_bp.route("", methods=["POST"])
@jwt_required()
def create_project():
    data = request.get_json() or {}
    p = Project(
        title=data.get("title"),
        description=data.get("description"),
        tech_stack=",".join(data.get("tech_stack", [])),
        github_url=data.get("github_url"),
        live_url=data.get("live_url"),
        image_url=data.get("image_url"),
        featured=data.get("featured", False),
        order=data.get("order", 0),
    )
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201


@projects_bp.route("/<int:project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    p = Project.query.get_or_404(project_id)
    data = request.get_json() or {}
    for field in ["title", "description", "github_url", "live_url", "image_url", "featured", "order"]:
        if field in data:
            setattr(p, field, data[field])
    if "tech_stack" in data:
        p.tech_stack = ",".join(data["tech_stack"])
    db.session.commit()
    return jsonify(p.to_dict())


@projects_bp.route("/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    p = Project.query.get_or_404(project_id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({"deleted": project_id})
