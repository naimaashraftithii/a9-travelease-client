````md
# 🚗 TravelEase – Car Rental Web App

TravelEase is a full-stack car rental platform where users can browse vehicles, filter by category/location/price, authenticate with email/password or Google, and request bookings. It features a modern, animated UI built with React, Tailwind CSS, Framer Motion, React Spring, and React Query, with Firebase Authentication and a Node/Express + MongoDB backend.

🌐 **Live Site:** https://frabjous-eclair-9a636d.netlify.app/

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- Email/password registration & login (Firebase Auth).
- Google sign-in support.
- Auth state persisted and listened via `onAuthStateChanged` / `onIdTokenChanged`.
- Firebase ID token automatically attached to API requests via Axios interceptor.
- Protected routes (only logged-in users can):
  - Add a vehicle
  - View their own vehicles
  - View their bookings
  - View vehicle details (in the latest `App.jsx` setup)

### 🚙 Vehicle Management
- **Add Vehicle**  
  - Authenticated users can add new vehicles with:
    - Name, category, price per day, location, description, availability
    - Cover image URL
    - Owner name & user email auto-filled from logged-in user
  - Uses `react-query` mutation + SweetAlert success/error feedback.

- **Update Vehicle**  
  - Edit existing vehicle data (`/update-vehicle/:id`).
  - Pre-filled form using `fetchVehicle(id)`.
  - On save, invalidates relevant queries (`vehicle`, `vehicles`, `myVehicles`).

- **Delete Vehicle**
  - Owners can delete their own vehicles from **My Vehicles**.
  - SweetAlert confirm dialog (`confirm`) before deletion.
  - React Query cache invalidation to reflect changes immediately.

### 🔍 Browse & Filter Vehicles
- **All Vehicles Page**
  - Filter by:
    - Category (Sedan/SUV/Electric/Van)
    - Location (case-insensitive)
    - Min/Max price
  - Sort by:
    - Newest (`createdAt`)
    - Price per day (ascending/descending)
  - Uses React Query + Axios to fetch vehicles with query params.

- **Vehicle Details Page**
  - Shows full details:
    - Image, name, description
    - Category, location, availability
    - Price per day
  - “Book Now” button:
    - Auth required (blocked with alert if not logged in)
    - Creates booking via `/bookings` API with `vehicleId` and `status`.

### 📊 Top & Latest Vehicles (Home Page)
- **Top Vehicles section:**
  - Two modes (toggle buttons):
    - **Latest 6** – newest vehicles by `createdAt`.
    - **Top 3 Most Booked** – vehicles sorted by booking count.
  - Data fetched via:
    - `fetchLatestVehicles()`
    - `fetchTopVehicles(limit)`
  - Cards show:
    - Image, vehicle name, location, category, price/day
    - Optional `totalBookings` info: `🚗 Booked X time(s)`

### 📅 Hero Booking Bar with Smart Validation
- **HeroBooking** component:
  - Animated hero section with a car image (Framer Motion + React Spring).
  - Mini booking form:
    - Name, pickup location, date (`dd/mm/yyyy`).
  - Validation using `date-fns`:
    - Valid date format check
    - Prevent past dates
    - Shows how many days from today the selected date is.
  - Uses SweetAlert to show a nicely formatted confirmation of the request.

### 🧾 Bookings
- **My Bookings Page**
  - Lists all bookings for the logged-in user.
  - Uses `myBookings` API.
  - Shows:
    - Vehicle image, name, category, location, booking status.

### 👤 My Vehicles
- **My Vehicles Page**
  - Shows only the vehicles added by the logged-in user.
  - Query uses `userEmail` filter.
  - Per-vehicle actions:
    - View (details)
    - Update
    - Delete (with confirmation)

### 🎨 UI & UX
- Fully responsive design.
- **Navbar**
  - Dynamic menu based on auth state.
  - Light/Dark theme toggle (persists in `localStorage`, sets HTML `data-theme` + `class="dark"`).
  - User avatar (Firebase photo or UI initials avatar).
  - Mobile menu with slide-down panel.

- **Footer**
  - Newsletter subscription with email validation + SweetAlert feedback.
  - Quick links, services section, contact info.
  - Social media icons with gradient backgrounds.
  - Dynamic © year.

- **Carousels & Sections**
  - `CarouselOne`: full-width image slider with auto-play and navigation.
  - `CarouselTwo`: “Popular Car Categories” animated grid with Framer Motion.
  - `OurServices`: four overlay cards describing key rental services.
  - `TestimonialsSection`: three testimonial cards + CTA “Book a Car”.

- **Loaders & Error States**
  - Custom `Loader` with animated Pac-Man-style circles + DaisyUI spinner fallback.
  - Generic `ErrorState` component with image, error message, retry & home buttons.
  - Global fullscreen loader when React Query is fetching (`useIsFetching` in `App.jsx`).

- **Not Found Page**
  - Animated 404 page with Framer Motion and “Go Home” button.

---

## 🧱 Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM** – client-side routing.
- **@tanstack/react-query** – data fetching & caching.
- **Tailwind CSS** + **DaisyUI** – styling & UI components.
- **Framer Motion** – animations (hero, 404, cards).
- **React Spring** – parallax motion effect on hero car image.
- **Swiper** – additional hero slider (alternative carousel).
- **Axios** – HTTP client with interceptors.
- **SweetAlert2** – beautiful pop-up alerts.
- **React Toastify** – toast notifications.

### Authentication
- **Firebase Authentication**
  - Email/password registration & login.
  - Google OAuth login.
  - ID tokens stored and reused via `localStorage` + `onIdTokenChanged`.

### Backend (Example / Expected)
- **Node.js + Express**
- **MongoDB + Mongoose** for `Vehicle` and `Booking` models.
- **Firebase Admin / Middleware** to verify JWT tokens.
- Endpoints for:
  - `GET /vehicles` – list with filters & sorting.
  - `GET /vehicles/:id`
  - `POST /vehicles`
  - `PATCH /vehicles/:id`
  - `DELETE /vehicles/:id`
  - `GET /vehicles/latest`
  - `GET /vehicles/top`
  - `POST /bookings`
  - `GET /my-bookings`
  - `GET /stats/top-vehicles` (if using a separate stats route).

---

## 🗂 Project Structure (Frontend)

```bash
src/
├─ api/
│  ├─ http.js                # Axios instance with auth interceptor
│  ├─ vehicles.js            # fetchVehicles, fetchVehicle, create/update/delete, top/latest
│  └─ bookings.js            # createBooking, myBookings
│
├─ components/
│  ├─ Navbar.jsx
│  ├─ Footer.jsx
│  ├─ HeroBooking.jsx
│  ├─ CarouselOne.jsx
│  ├─ CarouselTwo.jsx
│  ├─ VehicleCard.jsx
│  ├─ Loader.jsx
│  ├─ ErrorState.jsx
│  ├─ OurServices.jsx
│  ├─ OurTestimonial.jsx
│  └─ NotFound.jsx
│
├─ context/
│  └─ AuthContext.jsx        # AuthProvider with Firebase logic & hooks
│
├─ pages/
│  ├─ Home.jsx
│  ├─ AllVehicles.jsx
│  ├─ VehicleDetails.jsx
│  ├─ AddVehicle.jsx
│  ├─ UpdateVehicle.jsx
│  ├─ MyVehicles.jsx
│  ├─ MyBookings.jsx
│  ├─ Login.jsx
│  └─ Register.jsx
│
├─ routes/
│  └─ ProtectedRoute.jsx     # Wrapper to guard routes based on auth
│
├─ utils/
│  └─ safeImg.js             # Fallback image helper
│
├─ firebase/
│  └─ firebase.js (or firebase.config.js)
│
├─ App.jsx
├─ main.jsx
└─ index.css
````

---

## 🧩 Backend – Vehicle Routes (Example)

The frontend expects a backend with routes like:

```js
// routes/vehicle.routes.js
import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// GET /api/vehicles?category=&location=&minPrice=&maxPrice=&sortBy=&sortOrder=&userEmail=&limit=
router.get("/", async (req, res) => {
  const {
    category,
    location,
    minPrice,
    maxPrice,
    sortBy = "createdAt",
    sortOrder = "desc",
    userEmail,
    limit,
  } = req.query;

  const query = {};

  if (category) query.category = category;
  if (userEmail) query.userEmail = userEmail;

  if (location) {
    query.location = new RegExp(location, "i");
  }

  if (minPrice || maxPrice) {
    query.pricePerDay = {};
    if (minPrice) query.pricePerDay.$gte = Number(minPrice);
    if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
  }

  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  let cursor = Vehicle.find(query).sort(sort);
  if (limit) cursor = cursor.limit(Number(limit));

  const vehicles = await cursor.exec();
  res.json({ items: vehicles, total: vehicles.length });
});

// GET /api/vehicles/latest
router.get("/latest", async (req, res) => {
  const vehicles = await Vehicle.find({}).sort({ createdAt: -1 }).limit(6);
  res.json(vehicles);
});

// GET /api/vehicles/top?by=booked|rating&limit=3
router.get("/top", async (req, res) => {
  const by = req.query.by || "booked";
  const limit = parseInt(req.query.limit, 10) || 3;
  const sortStage =
    by === "rating"
      ? { rating: -1, createdAt: -1 }
      : { totalBookings: -1, createdAt: -1 };

  const vehicles = await Vehicle.find({}).sort(sortStage).limit(limit);
  res.json(vehicles);
});

// GET /api/vehicles/:id
router.get("/:id", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  res.json(vehicle);
});

// POST /api/vehicles
router.post("/", async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json(vehicle);
});

// PATCH /api/vehicles/:id
router.patch("/:id", async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  res.json(vehicle);
});

// DELETE /api/vehicles/:id
router.delete("/:id", async (req, res) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  res.json({ message: "Vehicle deleted" });
});

export default router;
```

> 🔎 Your actual backend might expose slightly different paths (e.g. `/latest-vehicles` or `/stats/top-vehicles`), but the frontend API layer (`src/api/vehicles.js`, `api.js`) is already wired to consume them. Make sure the URLs match on both sides.

---

## ⚙️ Setup & Installation (Frontend)

### 1️⃣ Prerequisites

* **Node.js** ≥ 18
* **npm** or **yarn**
* A **Firebase project** (for Authentication)
* A running **backend API** (Node/Express + MongoDB) reachable via `VITE_API_BASE`

---

### 2️⃣ Clone the Repo

```bash
git clone <your-repo-url> travelease
cd travelease
```

---

### 3️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 4️⃣ Environment Variables

Create a `.env.local` (or `.env`) file in the project root.
You have two patterns in your code; pick one style and keep it consistent.

#### Example using `VITE_FB_*` style

```env
VITE_FB_API_KEY=your_firebase_api_key
VITE_FB_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FB_PROJECT_ID=your_project_id
VITE_FB_STORAGE_BUCKET=your_project.appspot.com
VITE_FB_MESSAGING_SENDER_ID=your_sender_id
VITE_FB_APP_ID=your_app_id

# Backend API base URL
VITE_API_BASE=http://localhost:3000
```

Then in `src/firebase/firebase.js` (or `firebase.config.js`) you can use:

```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export default app;
```

> 🔐 Alternatively, you can hardcode the Firebase config (as shown in one of your files), but for production/portfolio use, environment variables are cleaner.

---

### 5️⃣ Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## 🚀 Build & Deployment

### Build

```bash
npm run build
# or
yarn build
```

This generates the production build in the `dist/` folder.

### Preview Locally

```bash
npm run preview
```

### Deploy

You can deploy `dist/` to any static hosting provider (Netlify, Vercel, Firebase Hosting, etc.). For Netlify:

1. Connect your GitHub repo to Netlify.
2. Set **Build Command**: `npm run build`
3. Set **Publish Directory**: `dist`
4. Configure the same environment variables in Netlify’s dashboard (Firebase keys + `VITE_API_BASE`).
5. Enable React Router SPA fallback (redirect all `/*` to `/index.html`).

---

## 🔐 Authentication Flow Overview

1. User registers or logs in (email/password or Google).
2. Firebase returns a user object and an ID token.
3. `AuthContext`:

   * Stores user in state.
   * Listens to auth state with `onAuthStateChanged`.
   * Listens to token change with `onIdTokenChanged` and stores `idToken` in `localStorage`.
4. Axios interceptor (in `api.js` / `http.js`):

   * Reads `idToken` from `localStorage`.
   * If missing but `auth.currentUser` exists, requests a fresh token.
   * Attaches `Authorization: Bearer <token>` to outgoing API calls.
5. Backend verifies this token for protected routes.

Protected routes (like `/addVehicle`, `/myVehicles`, `/myBookings`, `/vehicles/:id`) are additionally guarded client-side with `ProtectedRoute`, which:

* Shows `<Loader />` while auth state is loading.
* Redirects to `/register` (in your `PrivateRoute.jsx`) or login page if not authenticated.

---

## 🧪 Key Components at a Glance

* **`AddVehicle.jsx`**

  * Uses React Query’s `useMutation` with `createVehicle`.
  * On success:

    * SweetAlert success.
    * Invalidates `["vehicles"]` and `["myVehicles", user.email]`.

* **`AllVehicles.jsx`**

  * Uses React Query’s `useQuery` with `fetchVehicles(filters)`.
  * Controls `filters` state (category, location, min/max price, sortBy, sortOrder).
  * Provides buttons for price sort (low→high / high→low).

* **`Home.jsx`**

  * Uses `fetchLatestVehicles` & `fetchTopVehicles(3)` queries.
  * UI toggle between” Latest 6” and “Top 3 Most Booked”.
  * Also renders `HeroBooking`, `CarouselOne`, `OurServices`, `CarouselTwo`, and `OurTestimonial`.

* **`Login.jsx` & `Register.jsx`**

  * Form validation & UI.
  * Uses `loginEmail`, `registerEmail`, `loginGoogle` from `useAuth`.
  * Stores user on backend via `POST /users` (optional).
  * Redirects to home (`navigate("/", { replace: true })`) on success.

* **`MyBookings.jsx`**

  * Fetches bookings with `myBookings` via React Query.
  * Maps them to cards using `safeImg`.

* **`MyVehicles.jsx`**

  * Fetches user’s vehicles using `fetchVehicles({ userEmail: user.email })`.
  * Delete uses `deleteVehicle` mutation with SweetAlert confirm.
  * Invalidates relevant queries when deletion succeeds.

* **`VehicleDetails.jsx`**

  * Loads a single vehicle via `fetchVehicle(id)`.
  * `Book Now` triggers `createBooking` (wrapped as `book` mutation).
  * On success:

    * SweetAlert success.
    * Invalidates `["myBookings"]`.

---

## 🤝 Contributing

If you plan to extend or share this project:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add cool feature"
   ```
4. Push:

   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## 📜 License

You can choose any license you prefer. Common choices:

* MIT License – very permissive, great for portfolios.
* GPL – copyleft.

Example:

```text
This project is licensed under the MIT License.
```

---

## ✅ Summary

TravelEase is a polished full-stack car rental application showcasing:

* Real-world React patterns (React Query, protected routes, auth context).
* Firebase Authentication integration with backend JWT authorization.
* Elegant, responsive UI using Tailwind + modern animation libraries.
* Practical filtering, sorting, and booking flows suitable for a portfolio project.

Feel free to tweak this README to match your own repository name, backend repo link, and actual deployment URLs. 🚀

```
```
