import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./shared/Foorter";
import Navbar from "./shared/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/> 
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
