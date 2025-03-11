import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/single-page-form");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
