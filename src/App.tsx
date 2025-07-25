import { Routes, Route } from 'react-router-dom';
import Stopwatch from './components/StopWatch';
import SearchFeature from './components/SearchFeature';
import Home from './pages/Home';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question1" element={<Stopwatch />} />
        <Route path="/question2" element={<SearchFeature />} />
      </Routes>
    </div>
  );
}

export default App;