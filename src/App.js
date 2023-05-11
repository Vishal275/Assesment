import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import AssesmentForm from "./pages/AssesmentForm/AssesmentForm";
import ScoreCard from "./pages/ScoreCard/ScoreCard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";

function App() { 
  return (
    <div className="App">
      <div className="wrapper">
        <div className="main-container">
          <Router>
            <Routes>
              {/* OPEN ROUTES */}
              <Route path="/" element={<LandingPage />} exact />
              {/* PROTECTED ROUTES */}
              <Route element={<PrivateRoutes />}>
                <Route path="/assesment" element={<AssesmentForm />} exact />
                <Route path="/scorecard" element={<ScoreCard />} exact />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
