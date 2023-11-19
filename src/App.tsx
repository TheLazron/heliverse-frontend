import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import "./App.css";
import LoginCard from "./components/loginCard";
import SignUpCard from "./components/signupCard";
import AuthPage from "./pages/authentication";
import Home from "./components/home";
import NavLayout from "./layouts/navLayout";
import TeamsPage from "./components/teamsPage";

function App() {
  return (
    <Router>
      <NavLayout>
        <Routes>
<Route path="/" element={<Navigate to="/auth/login" />} />

          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<LoginCard />} />
            <Route path="signup" element={<SignUpCard />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/teams" element={<TeamsPage />} />
        </Routes>
      </NavLayout>
    </Router>
  );
}

export default App;
