import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import "./App.css";
import SampleComponent from "./components/sampleComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SampleComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
