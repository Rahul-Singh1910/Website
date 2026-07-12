from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, BlogPost

blog_bp = Blueprint("blog", __name__)


@blog_bp.route("", methods=["GET"])
def list_posts():
    posts = BlogPost.query.filter_by(published=True).order_by(BlogPost.created_at.desc()).all()
    return jsonify([p.to_dict(full=False) for p in posts])


@blog_bp.route("/<string:slug>", methods=["GET"])
def get_post(slug):
    p = BlogPost.query.filter_by(slug=slug).first_or_404()
    return jsonify(p.to_dict(full=True))


@blog_bp.route("", methods=["POST"])
@jwt_required()
def create_post():
    data = request.get_json() or {}
    p = BlogPost(
        title=data.get("title"),
        slug=data.get("slug"),
        content_md=data.get("content_md"),
        published=data.get("published", True),
    )
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201


@blog_bp.route("/<int:post_id>", methods=["PUT"])
@jwt_required()
def update_post(post_id):
    p = BlogPost.query.get_or_404(post_id)
    data = request.get_json() or {}
    for field in ["title", "slug", "content_md", "published"]:
        if field in data:
            setattr(p, field, data[field])
    db.session.commit()
    return jsonify(p.to_dict())


@blog_bp.route("/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    p = BlogPost.query.get_or_404(post_id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({"deleted": post_id})
