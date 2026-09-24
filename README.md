# 📋 Job Tracker

[![Status](https://img.shields.io/badge/Status-In%20Progress-orange?style=flat-square)](https://github.com/deanfoxcd/Application-Tracker)

A web app for tracking job applications – company, position, status, and application date, all in one place, secured behind your own account.

---

## ✨ Features

- Create, view, edit, and delete job applications (company, position, status, date applied, job URL as a clickable link)
- Email/password authentication with hashed passwords and JWT-based sessions
- Applications are scoped per user, backed by claims-based authorization on the API
- Responsive UI styled with Tailwind CSS

---

## 🛠️ Getting Started

This project has two parts: a .NET API and a React frontend, run separately.

1. **Clone the repo**
   ```bash
   git clone https://github.com/deanfoxcd/Application-Tracker.git
   cd Application-Tracker
   ```

2. **Run the backend**
   ```bash
   cd JobTracker.API
   dotnet restore
   dotnet user-secrets init
   dotnet user-secrets set "Jwt:Key" "<a long random string>"
   dotnet run
   ```
   The API will start on `http://localhost:5160`.

3. **Run the frontend**
   ```bash
   cd jobtracker-web-new
   npm install
   npm run dev
   ```
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

4. Register a new account from the app to get started.

---

## 🧰 Tech Stack

- **Frontend:** React (TypeScript), Vite, Tailwind CSS
- **Backend:** ASP.NET Core (.NET 10), Entity Framework Core
- **Database:** SQLite
- **Auth:** JWT bearer authentication, ASP.NET Core Identity password hashing

---

## ⚠️ Known Issues

- SQLite is file-based and not suitable for production hosting as-is

---

## ✅ To Do

- Add notes per application (backend endpoints exist, UI not built yet)
- Deploy (requires migrating off SQLite to a hosted database, and moving the JWT signing key to the host's environment variables/secret manager)

---

## 📬 Contact

Created by [Dean Fox](https://github.com/deanfoxcd) – feel free to reach out!
