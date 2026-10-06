# AVP Global Education Consultancy & Student Lead Management Platform

A production-ready, full-stack Education Consultancy and Student Lead Management web application built with **React + Vite**, **Node.js + Express**, and **MongoDB + Mongoose**.

The platform provides a public educational advisory website with an online student enquiry/application system, dynamic college and course directories, and a secure **Admin Management Portal** for counselors to manage leads through the entire admissions lifecycle (from initial enquiry to enrolled/admitted).

---

## 🌟 Key Features

### 🎓 Public Education Website
- **Preserved Brand Visual Identity**: Original AVP Global Education color palettes, responsive hero layouts, navigation, and typography.
- **Request Information / Lead Capture Form**:
  - Live integration with `POST /api/leads`.
  - Dynamic college selection populated directly from MongoDB (48+ institutions).
  - Dynamic course filtering based on selected college or general majors (92+ programs).
  - Robust frontend & backend validation (names, email format, phone, address, city, state, postal code).
  - Accidental duplicate submission prevention with friendly acknowledgment.
  - Interactive submission state with instant confirmation feedback.
- **Course Catalog**: Filterable by 14+ academic categories (Engineering, Medical, Management, Commerce, Science, Law, etc.) with real-time search.
- **College Directory**: Searchable list of affiliated universities and colleges across Bengaluru and Karnataka.
- **Support & Help Desk**: Interactive contact form (`POST /api/contact`) for general student/parent inquiries.
- **Newsletter Subscription**: Direct subscription integration (`POST /api/newsletter/subscribe`) with duplicate check.
- **Responsive & Accessible**: Seamlessly adapts from mobile (320px) to wide desktop screens (1440px+).

### 🛡️ Admin & Admissions Portal
- **Secure Authentication**:
  - JSON Web Tokens (JWT) with configurable expiration.
  - Passwords hashed using `bcrypt` (10 salt rounds).
  - Role-based authorization (`admin` and `manager/counselor`).
- **Real-Time Analytics Dashboard**:
  - KPI Stat Cards: Total Leads, New Enquiries, In Discussion, Follow-Ups, Interested, Applications, Admitted, Rejected, Closed.
  - Interactive admissions funnel breakdown.
  - Recent enquiries table with one-click status updates.
- **Lead Lifecycle Management (`/admin/leads`)**:
  - Server-side search across student name, email, phone, city.
  - Filter by Lead Status, College Affiliation, Course.
  - Server-side pagination and sorting (Newest/Oldest, Name A-Z).
  - **Lead Details View**: Full student personal info, contact info, chosen degree, address, and permissions.
  - **Counselor Notes Timeline**: Log internal counselor notes and track status change history with timestamps and author signatures.
  - **Inline Status Editor**: Update lead status (`new` &rarr; `contacted` &rarr; `follow-up` &rarr; `interested` &rarr; `application` &rarr; `admitted`).
  - **Edit & Delete Leads**: Complete record editing and deletion with safety confirmations.
- **College Directory Management (`/admin/colleges`)**:
  - Add, edit, activate/deactivate, and delete partner colleges.
- **Course Catalog Management (`/admin/courses`)**:
  - Add, edit, activate/deactivate, and delete degree programs across disciplines.
- **Help Desk Message Inbox (`/admin/contacts`)**:
  - View incoming messages, mark as read/resolved/archived, with direct email/phone shortcuts.
- **Newsletter Audience Management (`/admin/newsletter`)**:
  - Search subscriber emails, toggle active/inactive status, and **Export to CSV**.
- **Admin Settings (`/admin/settings`)**:
  - View administrator profile details and securely update account password.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, React Router v7, Axios, React Icons, CSS3 |
| **Backend** | Node.js (ES Modules), Express.js 4, Mongoose 8 |
| **Database** | MongoDB (Local or MongoDB Atlas) |
| **Security & Auth** | JSON Web Tokens (jsonwebtoken), bcryptjs, Helmet, CORS, express-rate-limit |

---

## 📁 Repository Structure

```
c:/Workspace/Education/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                 # Public topbar, header, and responsive navigation
│   │   │   ├── Footer.jsx                 # Working footer with newsletter & policies
│   │   │   └── ProtectedAdminRoute.jsx    # Client-side route guard for admin pages
│   │   ├── pages/
│   │   │   ├── HomePage.jsx               # Education portal homepage
│   │   │   ├── FormPage.jsx               # Request Information / Lead capture form
│   │   │   ├── CoursesPage.jsx            # Filterable courses directory
│   │   │   ├── CollegesPage.jsx           # Searchable colleges directory
│   │   │   ├── AboutPage.jsx              # About AVP Global Education consultancy
│   │   │   ├── ServicesPage.jsx           # Counseling and admission services
│   │   │   ├── ContactPage.jsx            # Help Desk & contact page
│   │   │   ├── FaqPage.jsx                # Accordion FAQ page
│   │   │   ├── LegalPages.jsx             # Terms, Privacy Policy, Refund Policy
│   │   │   ├── AdminLoginPage.jsx         # Secure Admin authentication page
│   │   │   ├── AdminDashboardPage.jsx     # KPI analytics dashboard
│   │   │   ├── AdminLeadsPage.jsx         # Full lead management & notes
│   │   │   ├── AdminCollegesPage.jsx      # College CRUD management
│   │   │   ├── AdminCoursesPage.jsx       # Course catalog management
│   │   │   ├── AdminContactsPage.jsx      # Help desk messages
│   │   │   ├── AdminNewsletterPage.jsx    # Newsletter audience & CSV export
│   │   │   └── AdminSettingsPage.jsx      # Admin profile & password change
│   │   ├── layouts/
│   │   │   ├── PublicLayout.jsx           # Header + Main + Footer wrapper
│   │   │   └── AdminLayout.jsx            # Admin sidebar + topbar layout
│   │   ├── services/
│   │   │   └── api.js                     # Centralized Axios API service with auth interceptors
│   │   ├── context/
│   │   │   └── AuthContext.jsx            # Global authentication state & session persistence
│   │   ├── App.jsx                        # Route registry
│   │   ├── App.css                        # Public website styles
│   │   ├── Admin.css                      # Admin portal styles
│   │   ├── Footer.css                     # Footer styles
│   │   ├── index.css                      # Base CSS reset
│   │   └── main.jsx                       # React entry point
│   ├── .env                               # Frontend environment variables
│   ├── .env.example                       # Example frontend environment variables
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                      # Mongoose connection
│   │   ├── controllers/
│   │   │   ├── authController.js          # Admin login, me, change password
│   │   │   ├── leadController.js          # Public submission & admin lead management
│   │   │   ├── adminController.js         # Dashboard statistics aggregation
│   │   │   ├── collegeController.js       # College querying and CRUD
│   │   │   ├── courseController.js        # Course querying and CRUD
│   │   │   ├── contactController.js       # Contact submission and management
│   │   │   └── newsletterController.js    # Newsletter subscriptions & export
│   │   ├── models/
│   │   │   ├── Admin.js                   # Admin user model with bcrypt
│   │   │   ├── Lead.js                    # Student Lead schema with notes & indexes
│   │   │   ├── College.js                 # Affiliated college schema
│   │   │   ├── Course.js                  # Academic program schema
│   │   │   ├── Contact.js                 # Help desk inquiry schema
│   │   │   └── Newsletter.js              # Newsletter subscriber schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js              # /api/auth endpoints
│   │   │   ├── leadRoutes.js              # /api/leads endpoints
│   │   │   ├── collegeRoutes.js           # /api/colleges endpoints
│   │   │   ├── courseRoutes.js            # /api/courses endpoints
│   │   │   ├── contactRoutes.js           # /api/contact endpoints
│   │   │   ├── newsletterRoutes.js        # /api/newsletter endpoints
│   │   │   └── adminRoutes.js             # /api/admin/* protected endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js          # JWT bearer token verification
│   │   │   ├── errorMiddleware.js         # Centralized error handler & 404 handler
│   │   │   └── rateLimitMiddleware.js     # API & auth rate limiters
│   │   ├── validators/
│   │   │   └── leadValidator.js           # Validation and input normalization
│   │   ├── utils/
│   │   │   └── generateToken.js           # JWT signature generator
│   │   ├── seed/
│   │   │   └── seed.js                    # Database seeder (Admin, 48 colleges, 92 courses)
│   │   └── server.js                      # Express application entry point
│   ├── .env                               # Backend environment variables
│   ├── .env.example                       # Example backend environment variables
│   └── package.json
│
├── package.json                           # Root convenience script runner
└── README.md
```

---

## ⚙️ Prerequisites & Setup

- **Node.js**: `v18.0.0` or higher (tested on `v25.9.0`)
- **npm**: `v9.0.0` or higher
- **MongoDB**: MongoDB Community Server running locally on port `27017` (or MongoDB Atlas connection string)

### 1. Environment Variables Configuration

#### Backend (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/education_consultancy
JWT_SECRET=education_consultancy_super_secret_jwt_key_2026_x!99
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=crcnitrox@gmail.com
ADMIN_PASSWORD=Hamja123
```

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Running

### Step 1: Install Dependencies

From root:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Seed the Database

Populate initial admin accounts, 48 colleges, and 92 accredited courses:
```bash
cd backend
npm run seed
```

**Default Seeded Credentials:**
- **System Administrator (Full Access):**
  - **Email:** `crcnitrox@gmail.com`
  - **Password:** `Hamja123`
- **Admissions Counselor (Manager):**
  - **Email:** `manager@education.com`
  - **Password:** `ManagerPassword123!`

### Step 3: Start the Backend API

```bash
cd backend
npm start
# or for live reload:
npm run dev
```
The server will run at: **`http://localhost:5000`**

### Step 4: Start the Frontend Application

```bash
cd frontend
npm run dev
```
The client will run at: **`http://localhost:5173`**

---

## 📡 API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/leads` | Submit student request info enquiry (duplicate protected) |
| `GET` | `/api/colleges` | Get active colleges (supports `?search=...`) |
| `GET` | `/api/courses` | Get active courses (supports `?category=...&college=...&search=...`) |
| `POST` | `/api/contact` | Submit contact / help desk message |
| `POST` | `/api/newsletter/subscribe` | Subscribe email to newsletter |

### Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate admin, returns JWT token and safe user profile |
| `GET` | `/api/auth/me` | Get currently authenticated admin details (`Bearer <token>`) |
| `PUT` | `/api/auth/update-password` | Update administrator password |

### Protected Admin Endpoints (`Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard/stats` | Aggregate dashboard KPIs and lead status counts |
| `GET` | `/api/admin/leads` | Paginated lead listing with search & filters |
| `GET` | `/api/admin/leads/:id` | Get full lead details by ID |
| `PATCH` | `/api/admin/leads/:id` | Update lead information |
| `PATCH` | `/api/admin/leads/:id/status` | Update lead status and log activity |
| `POST` | `/api/admin/leads/:id/notes` | Add a counselor note to lead history |
| `DELETE` | `/api/admin/leads/:id` | Delete a lead record |
| `GET` | `/api/admin/colleges` | Paginated college management |
| `POST` | `/api/admin/colleges` | Add new college |
| `PATCH` | `/api/admin/colleges/:id` | Update college details / toggle active status |
| `DELETE` | `/api/admin/colleges/:id` | Delete college |
| `GET` | `/api/admin/courses` | Paginated course catalog management |
| `POST` | `/api/admin/courses` | Add new course |
| `PATCH` | `/api/admin/courses/:id` | Update course details / toggle active status |
| `DELETE` | `/api/admin/courses/:id` | Delete course |
| `GET` | `/api/admin/contacts` | Paginated help desk inquiries |
| `PATCH` | `/api/admin/contacts/:id/status` | Update message status (`read`, `resolved`, etc.) |
| `DELETE` | `/api/admin/contacts/:id` | Delete inquiry |
| `GET` | `/api/admin/newsletter` | Paginated newsletter subscribers |
| `PATCH` | `/api/admin/newsletter/:id` | Toggle subscriber active/inactive status |
| `DELETE` | `/api/admin/newsletter/:id` | Delete subscriber |

---

## 🔒 Security Implementations

1. **Helmet**: Sets secure HTTP response headers to protect against common web vulnerabilities.
2. **CORS Configuration**: Restricts origin access strictly to `CLIENT_URL` (e.g. `http://localhost:5173`).
3. **Rate Limiting (`express-rate-limit`)**:
   - `apiLimiter`: 300 requests / 15 mins for general browsing.
   - `authLimiter`: 20 login attempts / 15 mins to mitigate brute-force attacks.
   - `formLimiter`: 15 submissions / 10 mins to stop spam submissions.
4. **Password Hashing**: Utilizes `bcrypt` with 10 salt rounds; plaintext passwords are never stored.
5. **Request Body Size Limits**: Capped at `20kb` to protect against payload starvation.
6. **Centralized Error Handling**: Ensures stack traces are not leaked in production environments.

---

## 🧪 Testing Verification

All 12 core tests specified in the requirements were tested and verified:

1. **Submit Valid Lead**: Verified end-to-end saving to MongoDB with instant confirmation response.
2. **Invalid Email Validation**: Rejected with HTTP 400 and explicit field error.
3. **Missing Required Fields**: Rejected with HTTP 400 detailing missing fields.
4. **Duplicate Enquiry Prevention**: Verified friendly duplicate notification without crashing or duplicating records.
5. **Admin Login**: Verified bcrypt verification, lastLogin update, and JWT token issuance.
6. **Wrong Admin Password**: Rejected with HTTP 401 Unauthorized.
7. **Unauthenticated Admin Route**: Rejected with HTTP 401 and redirected to `/admin/login`.
8. **Admin Opens Leads**: Server-side pagination verified with live MongoDB data.
9. **Admin Updates Lead Status**: Status updated and recorded into counselor note history.
10. **Admin Searches Lead**: Verified search query filtering across student name, email, and phone.
11. **Admin Filters by Status**: Verified status filtering (`new`, `contacted`, `interested`, `application`, `admitted`).
12. **Mobile & Responsive Layout**: Responsive breakpoints tested across 320px, 600px, 900px, and 1200px+.

---

## 📦 Production Deployment

### Building Frontend for Production
```bash
cd frontend
npm run build
```
Generates optimized static assets in `frontend/dist/`.

### Serving Frontend
Static files in `frontend/dist/` can be served via NGINX, Cloudflare Pages, Vercel, or directly through Express via `express.static()`.

### Starting Backend in Production
```bash
cd backend
export NODE_ENV=production
npm start
```
Recommended to use a process manager like **PM2**:
```bash
npm install -g pm2
pm2 start src/server.js --name "education-api"
```

---

## 🛠️ Troubleshooting

- **MongoDB Connection Error**:
  - Verify that MongoDB service is active: `Get-Service -Name *mongo*` or `sudo systemctl status mongod`.
  - Check the `MONGODB_URI` connection string in `backend/.env`.
- **CORS Error**:
  - Ensure `CLIENT_URL` in `backend/.env` matches the exact frontend origin (default: `http://localhost:5173`).
- **Token Expired / Unauthorized**:
  - JWT tokens default to 7 days. If expired, log in again at `/admin/login`.
