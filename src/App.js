import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./shared/Navbar";
import Footer from "./shared/Foorter";
import AuthProvider from "./auth/AuthContext";

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
    </AuthProvider>
  );
}

export default App;
