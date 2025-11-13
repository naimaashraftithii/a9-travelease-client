// src/components/ErrorState.jsx
import errImg from "../assets/error-404.png";
import { Link } from "react-router-dom";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t load the data right now. Please try again later.",
  onRetry,
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <img src={errImg} alt="Error" className="mx-auto h-44 w-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
        {message && <p className="mt-1 text-gray-600">{message}</p>}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <button onClick={onRetry} className="btn btn-primary">
              Try Again
            </button>
          )}
          <Link to="/" className="btn">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
