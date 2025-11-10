import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.init";
import toast from "react-hot-toast";

export default function Login() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button onClick={handleGoogleLogin} className="btn btn-primary">
        Sign in with Google
      </button>
    </div>
  );
}
