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
    @app.route("/api/run-seed")
    def run_seed():
        import os
        from models import Admin, Project, Experience

        secret = request.args.get("key")
        if secret != os.environ.get("SEED_SECRET"):
            return jsonify({"error": "unauthorized"}), 401

        result = []

        if not Admin.query.filter_by(username="rahul").first():
            admin = Admin(username="rahul")
            admin.set_password(os.environ.get("INITIAL_ADMIN_PASSWORD", "changeme-please-set-env-var"))
            db.session.add(admin)
            result.append("Created admin user.")
        else:
            result.append("Admin user already exists.")

        if Project.query.count() == 0:
            db.session.add(Project(
                title="NIFTY 50 Backtesting Engine",
                description="Built a modular Python engine processing 15+ years of minute-level financial data. Automated KPI generation (win rate, drawdown, rolling stability), reducing manual analysis effort by approximately 30%.",
                tech_stack="Python,Pandas,NumPy,API Integration",
                github_url="https://github.com/Rahul-Singh1910/nifty-backtesting-engine",
                featured=True, order=1,
            ))
            db.session.add(Project(
                title="Bank Nifty Short Strangle Backtest",
                description="Vectorized options backtest built for Qode Advisors LLP as a take-home assignment. Generates Excel output with Tradesheet, Stats, and Guide sheets, runs in under a minute.",
                tech_stack="Python,Pandas,Options Trading",
                github_url="https://github.com/Rahul-Singh1910",
                order=2,
            ))
            db.session.add(Project(
                title="Dysgraphia Classification Using CNN",
                description="Designed and implemented a deep learning-based system to classify handwriting patterns for early detection of Dysgraphia in children using CNNs.",
                tech_stack="Python,TensorFlow,EfficientNet B0,Flask",
                order=3,
            ))
            db.session.add(Project(
                title="Retail Sales Data Analysis",
                description="Analyzed 10K+ sales records using Python to uncover product profitability and customer behavior, generating actionable business insights.",
                tech_stack="Python,Pandas,Matplotlib,Seaborn",
                order=4,
            ))
            result.append("Added projects.")
        else:
            result.append("Projects already exist.")

        if Experience.query.count() == 0:
            db.session.add(Experience(
                role="Assistant Research Analyst",
                company="Junomoneta Finsol Pvt. Ltd. | Surat, India",
                duration="2025 - 2026",
                description=(
                    "\u2022 Developed Python-based automated pipelines for analysing real-time and historical financial datasets using REST APIs.\n"
                    "\u2022 Built automated reporting systems that reduced manual effort by approximately 35% and improved reporting turnaround time.\n"
                    "\u2022 Designed and implemented rule-based analytical frameworks for performance evaluation and risk assessment, ensuring structured decision-making.\n\n"
                    "Technologies: Python, REST APIs, Pandas, NumPy, Excel"
                ),
                order=1,
            ))
            result.append("Added experience.")
        else:
            result.append("Experience already exists.")

        db.session.commit()
        return jsonify({"result": result})

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
