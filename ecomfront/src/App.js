import "./App.css";
import Contact from './components/contact/Contact';
import Team from './components/team/Team';
import Nav from "./components/Nav";
import Journey from "./components/journey/Journey";
 import Allstore from './components/store/Allstore';
import Storeshoe from "./components/store/Storeshoe";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {
  return (
    <Router>
    <div className="App">
      <Nav></Nav>
      <Routes>
          <Route path="/" element={<Journey/>} />
        </Routes>
        <Routes>
          <Route path="/allproducts" element={<Allstore/>} />
        </Routes>
        <Routes>
          <Route path="/productdetails/:id" element={<Storeshoe/>} />
        </Routes>
        <Routes>
          <Route path="/journey" element={<Journey/>} />
        </Routes>
        <Routes>
          <Route path="/team" element={<Team/>} />
        </Routes>
        <Routes>
          <Route path="/contact" element={<Contact/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
