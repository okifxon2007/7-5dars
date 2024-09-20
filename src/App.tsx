import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Card from './pages/Card/Card';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/card/:id' element={<Card />}></Route>
      </Routes>
    </div>
  );
};

export default App;
