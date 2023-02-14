import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Header from './components/Header';

import './scss/app.scss';

interface ISearchContext {
  searshValue: string;
  setSearshValue: (value: string) => void;
}

export const SearchContext = createContext<ISearchContext>({
  searshValue: '',
  setSearshValue: () => '',
});

function App() {
  const [searshValue, setSearshValue] = useState<string>('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searshValue, setSearshValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searshValue={searshValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
