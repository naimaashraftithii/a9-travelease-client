import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ERR_IMG = "https://i.ibb.co.com/XxNFqsss/error.png";

/**
 * Reusable error screen for failed payments / API errors / generic issues
 */
export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t complete your request. Please try again later.",
  onRetry,
  homeButton = true,
}) {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-lg bg-white/5 dark:bg-white/10 border border-white/10 rounded-2xl shadow-xl p-8 text-center backdrop-blur"
      >
        <motion.img
          src={ERR_IMG}
          alt="Error"
          className="mx-auto h-40 w-auto mb-4 select-none"
          initial={{ rotate: -4, scale: 0.95 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          draggable="false"
        />

        <motion.h2
          className="text-2xl font-extrabold text-slate-900 dark:text-slate-100"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>

        {message && (
          <motion.p
            className="mt-2 text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            {message}
          </motion.p>
        )}

        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition"
            >
              Try Again
            </button>
          )}

          {homeButton && (
            <Link
              to="/"
              className="px-5 py-2 rounded-md font-semibold border border-slate-300/40 text-slate-800 dark:text-white hover:bg-white/10"
            >
              Go Home
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
