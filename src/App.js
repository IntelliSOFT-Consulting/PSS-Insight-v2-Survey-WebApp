import './App.css';
import { Routes, Route } from 'react-router-dom';
import Survey from './Pages/Survey';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/survey' element={<Survey />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
