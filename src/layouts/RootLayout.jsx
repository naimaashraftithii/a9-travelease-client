
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
  
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-0 py-6">
        <Outlet />
      </main>
      <Footer />


      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
