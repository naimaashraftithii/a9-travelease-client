import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Top navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-0 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
