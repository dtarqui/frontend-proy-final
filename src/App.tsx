import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </GlobalProvider>
  );
};

export default App;
