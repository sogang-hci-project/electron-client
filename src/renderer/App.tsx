import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Front from './page/Front';
import Browser from './page/Browser';
import Reader from './page/Reader';
import icon from '../../assets/icon.svg';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/browser" element={<Browser />} />
      </Routes>
    </Router>
  );
}
