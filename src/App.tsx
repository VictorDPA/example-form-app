import React from "react";
import {
  HashRouter as Router,
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
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-600 items-center justify-center">
      <h1 className="text-white text-center text-4xl font-bold mb-8">
        Anamnese Form
      </h1>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="bg-red-500 text-white px-4 py-2 rounded text-sm mb-4"
      >
        Clear Local Storage
      </button>
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
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
