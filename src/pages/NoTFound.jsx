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
          className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          We couldn’t find that page.
        </motion.h1>

        <motion.p
          className="mt-2 text-slate-600 dark:text-slate-300"
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
        >
          It may have been moved, deleted, or never existed.
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.26 }}
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
