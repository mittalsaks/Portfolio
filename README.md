# 🚀 Sakshi Mittal — Portfolio ...

> A full-stack developer portfolio with a custom admin dashboard, OTP-based login, and a live MongoDB-backed CMS.

[![Live Site](https://img.shields.io/badge/Live%20Site-portfolio--sakshi.onrender.com-brightgreen?style=flat-square)](https://portfolio-sakshi.onrender.com)
[![Backend](https://img.shields.io/badge/Backend%20API-onrender.com-blue?style=flat-square)](https://portfolio-backend-xvo6.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-mittalsaks%2FPortfolio-black?style=flat-square&logo=github)](https://github.com/mittalsaks/Portfolio)

---

## 🛠 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| TanStack Start | SSR framework (React 19) |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Vite | Build tool |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password + OTP hashing |
| Resend SDK | Email delivery |
| express-rate-limit | Rate limiting on auth routes |

---

## 📁 Project Structure

```
PORTFOLIO/
├── src/
│   ├── routes/
│   │   ├── index.tsx                     # Home / public portfolio
│   │   └── admin/
│   │       ├── login.tsx                 # Admin login (email + OTP)
│   │       └── dashboard.tsx             # Admin CMS dashboard
│   ├── components/
│   │   └── portfolio/
│   │       └── CursorTrail.tsx
│   └── lib/
│       └── api/
│           ├── client.ts                 # API fetch wrapper + auth
│           ├── types.ts                  # TypeScript interfaces
│           └── resources.ts              # CRUD API factories
├── portfolio-backend/
│   └── src/
│       ├── server.js                     # Express entry point
│       ├── controllers/
│       │   ├── authController.js
│       │   └── crudControllerFactory.js
│       ├── models/
│       │   ├── Admin.js
│       │   ├── Project.js
│       │   ├── Skill.js
│       │   ├── Experience.js
│       │   ├── Hackathon.js
│       │   ├── ResearchPaper.js
│       │   └── Profile.js
│       ├── middleware/
│       │   ├── auth.js                   # JWT protect middleware
│       │   └── errorHandler.js
│       ├── routes/api/
│       ├── config/db.js                  # MongoDB connection
│       └── utils/email.js               # Resend email utility
├── dist/
│   ├── client/                           # Static assets
│   └── server/                           # SSR server bundle
├── server-render.mjs                     # SSR entry (Render runs this)
└── generate-index.mjs
```

---

## 🔐 Authentication Flow

```
1. Admin enters email + password
2. Backend verifies credentials → generates 6-digit OTP
3. OTP hashed with bcrypt → saved to MongoDB (10-min expiry)
4. Resend API emails OTP to admin
5. Admin enters OTP → backend verifies hash
6. JWT issued → stored in localStorage
7. Protected routes receive: Authorization: Bearer <token>
8. Backend middleware verifies JWT on every request
```

---

## 📦 Data Models

| Model | Key Fields |
|-------|-----------|
| **Project** | title, description, category, tech[], github, demo, image, featured, order |
| **Skill** | category, items[{ name }], notesUrl, order |
| **Experience** | company, role, duration, type, bullets[], order |
| **Hackathon** | name, award, project, tech[], team, date, github, demo, order |
| **ResearchPaper** | title, authors, venue, year, abstract, tags[], pdfUrl, arxivUrl, order |
| **Profile** | name, handle, roles[], tagline, email, location, resumeUrl, socials{} |

---

## 🌐 API Endpoints

### Public
```
GET  /api/health
GET  /api/profile
GET  /api/projects
GET  /api/skills
GET  /api/experience
GET  /api/hackathons
GET  /api/research
POST /api/contact
```

### Auth
```
POST /api/auth/login             → verify credentials, send OTP
POST /api/auth/verify-otp        → verify OTP, issue JWT
GET  /api/auth/me                → get current admin (protected)
POST /api/auth/logout
PUT  /api/auth/change-password   → (protected)
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Protected CRUD (Bearer token required) 
```
POST   /api/:resource
PUT    /api/:resource/:id
DELETE /api/:resource/:id

# resources: projects, skills, experience, hackathons, research
```

---

## 🖥 Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Resend account (free tier)

### Frontend
```bash
git clone https://github.com/mittalsaks/Portfolio.git
cd Portfolio
npm install
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```

### Backend
```bash
cd portfolio-backend
npm install

cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_TO=youremail@gmail.com
ADMIN_EMAIL=youremail@gmail.com
OWNER_NAME=Sakshi Mittal
FRONTEND_URL=http://localhost:3000
EOF

node src/server.js
```

### Production Build
```bash
npm run build   # outputs to dist/client/ and dist/server/
```

---

## 🚀 Deployment (Render)

### Frontend Service
| Setting | Value |
|---------|-------|
| Build Command | _(none — `dist/` committed to git)_ |
| Start Command | `node server-render.mjs` |
| Env Variable | `VITE_API_URL=https://portfolio-backend-xvo6.onrender.com/api` |

### Backend Service
| Setting | Value |
|---------|-------|
| Root Directory | `portfolio-backend` |
| Start Command | `node src/server.js` |

### Backend Environment Variables
```env
PORT=5000
MONGODB_URI=<atlas connection string>
JWT_SECRET=<strong random string>
JWT_EXPIRES_IN=7d
NODE_ENV=production
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_TO=sakshimittal753@gmail.com
ADMIN_EMAIL=sakshimittal753@gmail.com
OWNER_NAME=Sakshi Mittal
FRONTEND_URL=https://portfolio-sakshi.onrender.com
```

### Deploy
```bash
npm run build
git add .
git commit -m "your commit message"
git push origin main
# Render auto-deploys within 2-3 minutes
```

---

## ⏰ Uptime Monitoring

UptimeRobot (free) pings every 5 minutes to prevent Render free-tier sleep:

| Service | URL |
|---------|-----|
| Backend | `https://portfolio-backend-xvo6.onrender.com/api/health` |
| Frontend | `https://portfolio-sakshi.onrender.com` |

---

## 🔒 Security Features

- OTP hashed with bcrypt before DB storage (never stored plain)
- JWT in localStorage, sent as Bearer token
- Rate limiting on all auth routes
- CORS restricted to frontend domain only
- Passwords hashed with bcrypt via pre-save hook
- Reset tokens & OTPs are single-use with 10-min expiry

---

## 📝 Admin Dashboard

> Access at `/admin/login` → `/admin/dashboard`

| Section | What you can manage |
|---------|-------------------|
| Profile | Name, bio, socials, resume URL |
| Projects | Title, tech stack, links, featured flag |
| Skills | Categories + skill items |
| Experience | Company, role, bullet points |
| Hackathons | Awards, team, github/demo links |
| Research | Papers with PDF/Scholar/arXiv links |

---

*Built with ❤️ by Sakshi Mittal*
