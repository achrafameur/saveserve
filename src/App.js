import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthProvider from "./auth/AuthContext";

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
