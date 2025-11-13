import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="mb-4"
        >
          <span className="block text-7xl md:text-8xl font-black text-blue-600 drop-shadow-sm">
            404
          </span>
        </motion.div>

        <motion.h1
          className="text-xl md:text-2xl font-semibold"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          We couldn't find that page.
        </motion.h1>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
