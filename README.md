# Portfolio Full Stack Project

Flask (API + DB) backend + React (Vite) frontend. Includes: dynamic projects,
employment history, resume downloads, contact form, admin panel, and visit
analytics.

## ⚠️ IMPORTANT: How to unzip this correctly

When you extract this zip, make sure you don't end up with a folder-inside-a-folder
(e.g. `portfolio-fullstack/portfolio-fullstack/backend`). To avoid that:

1. Right-click the zip file → **Extract All**
2. When Windows asks for a destination, it will suggest something like
   `Desktop\portfolio-fullstack\`. Use exactly that (don't add another folder name).
3. After extracting, open that folder and confirm you see `backend`, `frontend`,
   and `README.md` **directly inside it** — not inside another folder of the same name.
4. In VS Code: File → Open Folder → select that folder directly.

If you're not sure, just run `dir` (Windows) once VS Code's terminal opens, and check
you can see `backend` and `frontend` listed immediately — if not, `cd` into whatever
subfolder shows them, and reopen VS Code from there instead.

## Structure
```
backend/    Flask REST API
frontend/   React (Vite) SPA
```

## 1. Backend setup

Open a terminal in VS Code, then:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install Flask Flask-SQLAlchemy Flask-JWT-Extended Flask-CORS python-dotenv gunicorn
copy .env.example .env
```

Open the new `.env` file and make sure it does **NOT** contain a `DATABASE_URL` line
pointing at Postgres — for local use, just leave `DATABASE_URL` out entirely; it'll
default to SQLite automatically. It should look like:
```
JWT_SECRET_KEY=replace-with-a-long-random-string
CORS_ORIGINS=http://localhost:5173,https://your-portfolio-domain.netlify.app
```

Then:
```powershell
python seed.py
python app.py
```
You should see `* Running on http://127.0.0.1:5000`. **Leave this terminal running.**

## 2. Frontend setup

Open a **second, new terminal tab** (click the `+` icon in the terminal panel —
don't reuse the backend one):

```powershell
cd frontend
npm install
```

Create a file `frontend/.env` with:
```
VITE_API_URL=http://localhost:5000/api
```

Then:
```powershell
npm run dev
```
You should see `Local: http://localhost:5173/`. **Leave this terminal running too.**

Open `http://localhost:5173` in your browser.

## 3. Add your photo and resumes

- `frontend/public/profile.jpg` — your photo (there's a placeholder .txt file there now, delete it once your photo is in place)
- `frontend/public/resumes/rahul-singh-fintech.pdf`
- `frontend/public/resumes/rahul-singh-it-services.pdf`

Just drag your real files into those folders in VS Code's sidebar, using those exact
filenames. No restart needed — refresh the browser.

## 4. Managing content (projects, experience)

Go to `http://localhost:5173/admin`, log in with `rahul` / `changeme123`
(**change this password** by editing `seed.py` before running it, or add a
change-password endpoint later). From the dashboard you can add/delete projects.

To edit employment history entries, use the same pattern as projects — either
extend the admin dashboard UI, or edit directly via `seed.py` and re-seed
(delete `backend/instance/portfolio.db` first if re-seeding with changes).

## 5. Deploy (all free tier)

**Database — Supabase or Neon:** create a free Postgres project, copy the
connection string into `backend/.env` as `DATABASE_URL` (only needed for deployment,
not local dev).

**Backend — Render:** New Web Service → root dir `backend` → build command
`pip install -r requirements.txt` → start command `gunicorn app:app`. Add env vars
`DATABASE_URL`, `JWT_SECRET_KEY`, `CORS_ORIGINS`. Run `python seed.py` once via
Render's Shell tab after first deploy.

**Frontend — Netlify:** root dir `frontend`, build command `npm run build`, output
dir `dist`. Env var `VITE_API_URL=https://your-backend.onrender.com/api`.

## Two terminals, always

Every time you sit down to work on this: you need the backend (`python app.py`)
and frontend (`npm run dev`) running **at the same time**, in two separate
terminal tabs. Closing VS Code stops both — just restart both next time.
