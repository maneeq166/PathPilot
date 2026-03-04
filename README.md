# PathPilot Frontend TODO

## ✅ Implementation Checklist

### Phase 1: Project Setup
- [ ] Initialize React project with Vite
- [ ] Install core packages: @tanstack/react-router, axios, @tanstack/react-query
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure (api/, router/, pages/, components/, context/, hooks/)

### Phase 2: Authentication
- [ ] Set up axios instance with baseURL and JWT interceptor
- [ ] Create AuthContext for user state management
- [ ] Implement protected routes
- [ ] Build Login page with email/password
- [ ] Build Register page
- [ ] Add Google OAuth button (redirect to /api/auth/google)
- [ ] Implement JWT storage and auto-attachment

### Phase 3: Core Pages
- [ ] Create Home/Landing page
- [ ] Create Dashboard page with navigation
- [ ] Create Navbar component

### Phase 4: Resume Upload
- [ ] Create ResumeUpload page
- [ ] Implement file upload with Multer (PDF, DOCX support)
- [ ] Display extracted skills and role from NLP
- [ ] Create ResumeCard component

### Phase 5: Job Features (Web Scraping)
- [ ] Create Jobs page
- [ ] Fetch matched jobs from GET /api/jobs/match
- [ ] Display jobs using JobCard component
- [ ] Implement save job functionality
- [ ] Create view for saved jobs

### Phase 6: User Profile
- [ ] Display user profile with extracted skills
- [ ] Show saved jobs count

### Phase 7: Polish & Error Handling
- [ ] Add loading spinners
- [ ] Add error/success messages
- [ ] Test all protected routes

---

Stack:

React
Vite
TailwindCSS
TanStack Router
Axios
TanStack Query

Backend connected via REST API

---

# 0. Create Project

npm create vite@latest frontend

Select:

React
JavaScript

cd frontend

npm install

---

# 1. Install Core Packages

Routing

npm install @tanstack/react-router

API and Server State

npm install axios @tanstack/react-query

Styling

npm install tailwindcss postcss autoprefixer

npx tailwindcss init -p

---

# 2. Configure Tailwind

Edit:

tailwind.config.js

Add:

content:

"./index.html"
"./src/**/*.{js,jsx}"

---

Edit:

src/index.css

Add:

@tailwind base;
@tailwind components;
@tailwind utilities;

---

# 3. Folder Structure

src/

main.jsx

App.jsx

api/
    axios.js

router/
    router.jsx

pages/

    Home.jsx

    Login.jsx

    Register.jsx

    Dashboard.jsx

    ResumeUpload.jsx

    Jobs.jsx

components/

    Navbar.jsx

    JobCard.jsx

    ResumeCard.jsx

context/

    AuthContext.jsx

hooks/

    useAuth.js

---

# 4. Setup Axios

File:

api/axios.js

TODO:

create axios instance

baseURL:

http://localhost:5000/api

attach JWT token automatically

---

# 5. Setup Router

File:

router/router.jsx

Routes:

/

Home

/login

/register

/dashboard

/resume

/jobs

---

# 6. Setup Auth Context

File:

context/AuthContext.jsx

TODO:

store user

store token

login function

logout function

check login status

use localStorage

---

# 7. Pages Implementation

---

# Home Page

File:

pages/Home.jsx

TODO:

landing page

login button

register button

---

# Login Page

File:

pages/Login.jsx

TODO:

email input

password input

call:

POST /api/auth/login

store token

redirect dashboard

Add Google Login button

redirect to:

/api/auth/google

---

# Register Page

File:

pages/Register.jsx

TODO:

name

email

password

call:

POST /api/auth/register

redirect login

---

# Dashboard Page

File:

pages/Dashboard.jsx

TODO:

show navbar

show buttons:

Upload Resume

View Jobs

Logout

---

# Resume Upload Page

File:

pages/ResumeUpload.jsx

TODO:

file upload input

accept:

PDF
DOCX

call:

POST /api/resume/upload

multipart/form-data

show parsed data

skills

role

---

# Jobs Page

File:

pages/Jobs.jsx

TODO:

call:

GET /api/jobs/match

display jobs

map jobs

use JobCard component

---

# 8. Components

---

# Navbar

File:

components/Navbar.jsx

TODO:

show:

Dashboard

Resume

Jobs

Logout

---

# JobCard

File:

components/JobCard.jsx

TODO:

display:

title

company

location

match score

---

# ResumeCard

File:

components/ResumeCard.jsx

TODO:

display:

skills

role

upload date

---

# 9. Protected Routes

Prevent access if not logged in

redirect login

---

# 10. Auth Flow

Register

↓

Login

↓

Store JWT

↓

Access Dashboard

↓

Upload Resume

↓

See Jobs

---

# 11. Google OAuth Flow

Button click →

redirect backend

Backend returns →

Frontend receives token

 dashboard

---

#Store token

Redirect 12. Loading and Error Handling

Show:

loading spinner

error messages

success messages

---

# 13. Environment Variable

Create:

.env

Add:

VITE_API_URL=http://localhost:5000/api

---

# 14. Final Frontend Completion Checklist

[ ] Router working

[ ] Auth working

[ ] Google login working

[ ] JWT stored

[ ] Resume upload working

[ ] Resume data visible

[ ] Jobs fetched

[ ] Jobs displayed

[ ] Protected routes working

[ ] Logout working

---

# MVP Frontend Complete
