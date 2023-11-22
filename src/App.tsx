import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import './scss/app.scss';
import Home from './Pages/Home';
import { Suspense, lazy } from 'react';

const Cart = lazy(() => import(/*webpackChunkName: 'Cart'*/ './Pages/Cart'));
const NotFound = lazy(
  () => import(/*webpackChunkName: 'NotFound'*/ './Pages/NotFound')
);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>"Идет загрузка корзины..."</div>}>
                <Cart />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />{' '}
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
