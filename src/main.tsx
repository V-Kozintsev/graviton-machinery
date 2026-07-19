import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequestProvider } from './state/RequestContext';
import { CatalogPage } from './pages/CatalogPage';
import { ContactsPage } from './pages/ContactsPage';
import { DesignBoard } from './pages/DesignBoard';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { RequestPage } from './pages/RequestPage';
import './styles.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <RequestProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="catalog/:slug" element={<ProductPage />} />
            <Route path="request" element={<RequestPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="design-board" element={<DesignBoard />} />
            <Route path="mockup/form-errors" element={<RequestPage forceErrors />} />
            <Route path="mockup/request-success" element={<RequestPage forceSuccess />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </RequestProvider>
    </HashRouter>
  </React.StrictMode>,
);
