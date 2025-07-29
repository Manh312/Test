import { Routes, Route } from 'react-router-dom';
import SearchFeature from './pages/SearchFeature';
import Home from './pages/Home';
import Watch from './pages/Watch';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question1" element={<Watch />} />
        <Route path="/question2" element={<SearchFeature />} />
      </Routes>
    </div>
  );
}

export default App;