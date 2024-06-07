import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailOrder from "./detailOrder"; 
import Home from "./home"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} /> {/* Use element instead of component */}
        <Route path="/detail-order" element={<DetailOrder />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
}

export default App;
