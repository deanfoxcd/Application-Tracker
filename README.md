# 📋 Job Tracker

[![Status](https://img.shields.io/badge/Status-In%20Progress-orange?style=flat-square)](https://github.com/deanfoxcd/Application-Tracker)

A web app for tracking job applications – company, position, status, and application date, all in one place, secured behind your own account.

---

## ✨ Features

- Create, view, edit, and delete job applications (company, position, status, date applied, job URL as a clickable link)
- Add, edit, and delete notes per application
- Email/password authentication with hashed passwords and JWT-based sessions
- Applications and notes are scoped per user, backed by claims-based authorization on the API
- Responsive UI styled with Tailwind CSS

---

## 🛠️ Getting Started

This project has two parts: a .NET API and a React frontend, run separately. The API needs a Postgres database, run locally via Docker.

1. **Clone the repo**
   ```bash
   git clone https://github.com/deanfoxcd/Application-Tracker.git
   cd Application-Tracker
   ```

2. **Start Postgres** (requires [Docker](https://www.docker.com/products/docker-desktop/))
   ```bash
   docker run --name jobtracker-postgres \
     -e POSTGRES_USER=jobtracker \
     -e POSTGRES_PASSWORD=devpassword \
     -e POSTGRES_DB=jobtracker \
     -p 5432:5432 \
     -v jobtracker-postgres-data:/var/lib/postgresql/data \
     -d postgres:16
   ```

3. **Run the backend**
   ```bash
   cd JobTracker.API
   dotnet restore
   dotnet user-secrets init
   dotnet user-secrets set "Jwt:Key" "<a long random string>"
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=jobtracker;Username=jobtracker;Password=devpassword"
   dotnet ef database update
   dotnet run
   ```
   The API will start on `http://localhost:5160`.

4. **Run the frontend**
   ```bash
   cd jobtracker-web-new
   npm install
   npm run dev
   ```
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

5. Register a new account from the app to get started.

---

## 🧰 Tech Stack

- **Frontend:** React (TypeScript), Vite, Tailwind CSS
- **Backend:** ASP.NET Core (.NET 10), Entity Framework Core
- **Database:** PostgreSQL (via Docker for local development)
- **Auth:** JWT bearer authentication, ASP.NET Core Identity password hashing

---

## ✅ To Do

- Deploy (frontend on Vercel, backend + Postgres on Render, with the JWT signing key and connection string moved to the host's environment variables/secret manager)

---

## 📬 Contact

Created by [Dean Fox](https://github.com/deanfoxcd) – feel free to reach out!
