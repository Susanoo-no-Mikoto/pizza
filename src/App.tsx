import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Header from './components/Header';

import './scss/app.scss';

function App() {
  const [searshValue, setSearshValue] = useState<string>('');

  return (
    <div className="wrapper">
      <Header searshValue={searshValue} setSearshValue={(value: string) => setSearshValue(value)} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searshValue={searshValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
