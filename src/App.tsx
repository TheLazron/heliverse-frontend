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

function App() {
  return (
    <Router>
      <NavLayout>
        <Routes>
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<LoginCard />} />
            <Route path="signup" element={<SignUpCard />} />
          </Route>
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </NavLayout>
    </Router>
  );
}

export default App;
