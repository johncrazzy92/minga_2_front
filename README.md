# Minga Frontend (`minga_2_front`)

Modern Single Page Application (SPA) for the Minga manga platform, built with React 18, Vite, Redux Toolkit, and Tailwind CSS.

## 🛠️ Tech Stack & Dependencies
- **Runtime & Bundler:** Vite 4.4, Node.js `>= 20.0.0`
- **UI Framework:** React 18.2
- **State Management:** Redux Toolkit 1.9 & React-Redux 8.1
- **Routing:** React Router DOM 6.15 (with `ProtectedRoute`)
- **HTTP Client:** Centralized Axios (`src/services/apiClient.js`)
- **Styling:** Tailwind CSS 3.3
- **Feedback & Notifications:** SweetAlert2 & React-Toastify

## 🚀 Environment Variables (`.env`)
Refer to [`.env.example`](file:///c:/ws/oldMinga/minga_2_front/.env.example) for required client-side environment variables.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend REST API | `http://localhost:8080` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Web Client ID | *(Google Cloud console)* |

## 🧪 Available Scripts
```bash
npm run dev     # Starts Vite development server on http://localhost:5173
npm run build   # Compiles optimized production bundle in dist/
npm run preview # Previews the production bundle locally
npm run lint    # Runs ESLint (strict 0 errors, 0 warnings policy)
```

## 🛡️ Architecture & Features
- **Centralized API Client (`apiClient.js`):** Interceptors automatically inject `Authorization: Bearer <token>` on every request and catch `401 Unauthorized` responses to clear expired sessions gracefully.
- **Role-Based Protected Routes:** Route guards (`ProtectedRoute`) restrict administrative and author views (`/manga-form`, `/chapter-form/:id`, `/edit/:manga_id`, `/admin`) based on verified user roles.
- **Empty & Loading States:** Clean feedback states, skeletons, and error fallbacks ensure responsive UX even under slow network conditions.
