import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SinglePageForm from "./pages/SinglePageForm";
import MultiStepForm from "./pages/MultiStepForm";
import { useAuthStore } from "./store/auth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="min-h-screen flex-col bg-slate-600 flex items-center justify-center">
      <div className="text-white text-center text-4xl font-bold mb-8">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Clear Local Storage
        </button>
      </div>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/single-page-form"
              element={
                <ProtectedRoute>
                  <SinglePageForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/multi-step-form"
              element={
                <ProtectedRoute>
                  <MultiStepForm />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
