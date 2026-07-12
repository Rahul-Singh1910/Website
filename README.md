# Rahul Singh — Portfolio (Full Stack)

**Live site:** https://rahulsingh19.vercel.app
**Backend API:** https://portfolio-backend-web-axmp.onrender.com/api

Flask (API + DB) backend + React (Vite) frontend. Includes: dynamic projects,
employment history, resume download, contact form, admin panel, and visit
analytics.

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Axios, plain CSS
- **Backend:** Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-CORS
- **Database:** PostgreSQL (Supabase)
- **Hosting:** Vercel (frontend), Render (backend)

## Structure
```
backend/    Flask REST API
frontend/   React (Vite) SPA
```

## Running Locally

### 1. Backend setup

Open a terminal, then:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` and fill in your own values:
```
JWT_SECRET_KEY=replace-with-a-long-random-string
CORS_ORIGINS=http://localhost:5173
INITIAL_ADMIN_PASSWORD=replace-with-your-own-password
SEED_SECRET=replace-with-a-random-string
```

For local development, leave `DATABASE_URL` unset — it defaults to a local
SQLite file automatically.

Then:
```powershell
python app.py
```
You should see `* Running on http://127.0.0.1:5000`. Leave this terminal running.

### 2. Frontend setup

Open a **second terminal tab**:

```powershell
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Then:
```powershell
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Add your own assets (if forking this)

- `frontend/public/profile.jpg` — your photo
- `frontend/public/resumes/Rahul_Singh_CV.pdf` — your resume

### 4. Admin panel

Visit `/admin` on the running frontend. Credentials are controlled entirely by
environment variables (`INITIAL_ADMIN_PASSWORD` on the backend) — no default
password is committed to this repo. Set your own value before first seeding
the database.

## Deployment

- **Database:** Supabase (Postgres), connected via a pooled connection string
- **Backend:** Render — root dir `backend`, build `pip install -r requirements.txt`,
  start `gunicorn app:app`. Environment variables: `DATABASE_URL`, `JWT_SECRET_KEY`,
  `CORS_ORIGINS`, `INITIAL_ADMIN_PASSWORD`, `SEED_SECRET`.
- **Frontend:** Vercel — root dir `frontend`, framework auto-detected as Vite,
  build `npm run build`, output `dist`. Environment variable:
  `VITE_API_URL=https://<your-backend>.onrender.com/api`. Includes a
  `vercel.json` rewrite rule so client-side routes (e.g. `/admin`) resolve
  correctly on direct navigation/refresh.

## Notes

- The backend is on Render's free tier, which spins down after inactivity —
  a keep-alive monitor pings `/api/health` periodically to minimize cold starts.
- CORS is restricted to the deployed frontend origin plus `localhost` for
  local development.