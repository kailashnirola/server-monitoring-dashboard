# 🖥️ Server Monitoring Dashboard

A full-stack server monitoring dashboard that provides real-time metrics such as CPU usage, memory consumption, and disk activity. Built with **React.js**, **FastAPI**, and **PostgreSQL**, and deployed on **Render**.

> 🚀 Live Frontend: [https://server-monitor-frontend-3n5h.onrender.com](https://server-monitor-frontend-3n5h.onrender.com)  
> 🌐 Live Backend: [https://server-monitoring-dashboard-backend.onrender.com](https://server-monitoring-dashboard-backend.onrender.com)

---

## 📸 Screenshots

### Dashboard View  
![Dashboard Screenshot](./screenshots/image_1.png)

### Real-time Monitoring  
![Real-time Monitoring](./screenshots/image_2.png)

---

## 📁 File Structure

```
server-monitoring-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── db.py
│   │   ├── api/
│   │   │   ├── metrics.py
│   │   │   └── servers.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AlertSummary.jsx
│   │   │   └── ServerList.jsx
│   │   └── services/
│   │       └── api.js
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Tech Stack

### 🔹 Frontend – React.js + Tailwind CSS
- `React` – User interface
- `Axios` – HTTP client
- `Recharts` – Graphs
- `Tailwind CSS` – Styling

### 🔹 Backend – FastAPI
- `FastAPI` – Python-based REST API
- `SQLAlchemy` – ORM for database operations
- `Uvicorn` – ASGI server

### 🔹 Database – PostgreSQL

### 🔹 Hosting – Render
- Frontend (Static Site)
- Backend (Web Service)
- PostgreSQL (Managed DB)

---

## 🧰 Prerequisites

- **Python** 3.9+
- **Node.js** 16+ & **npm**
- **PostgreSQL** 13+

---

## ⚙️ Local Development Setup

### 🔐 1. Database

Install PostgreSQL and create a database:

```sql
-- in psql shell
CREATE DATABASE monitoring_db;
CREATE USER monitoring_user WITH PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE monitoring_db TO monitoring_user;
```

---

### 🧪 2. Backend

```bash
cd server-monitoring-dashboard/backend

# 1. Copy .env and configure
cp .env.example .env
# Edit .env to set your DB URL, e.g.
# DATABASE_URL=postgresql://monitoring_user:yourpass@localhost:5432/monitoring_db

# 2. Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate        # macOS/Linux
# .venv\Scriptsctivate.bat     # Windows

# 3. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 4. Run FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

📍 Visit: [http://localhost:8000/docs](http://localhost:8000/docs) to view the interactive API docs.

---

### 💻 3. Frontend

```bash
cd server-monitoring-dashboard/frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

🌐 Open: [http://localhost:3000](http://localhost:3000)

Make sure to create a `.env` file in the frontend with the following:

```env
REACT_APP_API_URL=http://localhost:8000
```

---

## 🙌 Author

**Kailash Nirola**  
🔗 [GitHub Profile](https://github.com/kailashnirola)

---

## 📨 Contact

For feedback, questions, or collaborations — feel free to reach out through GitHub.

---
