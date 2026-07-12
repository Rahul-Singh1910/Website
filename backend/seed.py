"""
Run once (or after wiping instance/portfolio.db) to load your real data.
Usage: python seed.py
"""
from app import create_app
from models import db, Admin, Project, Experience

app = create_app()

with app.app_context():
    # --- Admin user ---
    if not Admin.query.filter_by(username="rahul").first():
        admin = Admin(username="rahul")
        import os
        admin.set_password(os.environ.get("INITIAL_ADMIN_PASSWORD", "changeme-please-set-env-var"))  # CHANGE THIS after first login
        db.session.add(admin)
        print("Created admin user 'rahul' / 'changeme123' - change the password!")
    else:
        print("Admin user already exists.")

    # --- Real projects ---
    if Project.query.count() == 0:
        db.session.add(Project(
            title="NIFTY 50 Backtesting Engine",
            description="Built a modular Python engine processing 15+ years of minute-level financial data. Automated KPI generation (win rate, drawdown, rolling stability), reducing manual analysis effort by approximately 30%.",
            tech_stack="Python,Pandas,NumPy,API Integration",
            github_url="https://github.com/Rahul-Singh1910/nifty-backtesting-engine",
            featured=True,
            order=1,
        ))
        db.session.add(Project(
            title="Bank Nifty Short Strangle Backtest",
            description="Vectorized options backtest built that generates Excel output with Tradesheet, Stats, and Guide sheets, runs in under a minute.",
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
        print("Added real projects.")

    # --- Employment history ---
    if Experience.query.count() == 0:
        db.session.add(Experience(
            role="Assistant Research Analyst",
            company="Junomoneta Finsol Pvt. Ltd. | Surat, India",
            duration="2025 - 2026",
            description=(
                "• Developed Python-based automated pipelines for analysing real-time and historical financial datasets using REST APIs.\n"
                "• Built automated reporting systems that reduced manual effort by approximately 35% and improved reporting turnaround time.\n"
                "• Designed and implemented rule-based analytical frameworks for performance evaluation and risk assessment, ensuring structured decision-making.\n\n"
                "Technologies: Python, REST APIs, Pandas, NumPy, Excel"
            ),
            order=1,
        ))
        print("Added employment history.")

    db.session.commit()