import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Page3D from './pages/Page3D';
import Anim from './pages/Anim';
import Game from './pages/Game';
import Production from './pages/Production';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d" element={<Page3D />} />
        <Route path="/anim" element={<Anim />} />
        <Route path="/game" element={<Game />} />
        <Route path="/production" element={<Production />} />
      </Routes>
    </Router>
  );
}

export default App;
