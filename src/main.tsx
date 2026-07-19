import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <RequestProvider>
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
