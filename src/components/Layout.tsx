import { ClipboardList, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useLockBody } from '../hooks/useLockBody';
import { useRequest } from '../state/RequestContext';

const nav = [
  ['/', 'Главная'],
  ['/catalog', 'Каталог'],
  ['/request', 'Заявка'],
  ['/contacts', 'Контакты'],
];

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="GRAVITON - на главную">
      <span className="logo-mark">G</span>
      <span>
        <strong>GRAVITON</strong>
        <small>строительная техника</small>
      </span>
    </Link>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const { count } = useRequest();
  useLockBody(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        opener.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Основная навигация">
            {nav.map(([href, label]) => (
              <NavLink key={href} to={href} end={href === '/'}>{label}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <a className="phone" href="tel:+78005501984"><Phone size={18} /> 8 800 550-19-84</a>
            <Link className="request-link" to="/request" aria-label={`Открыть заявку, позиций: ${count}`}>
              <ClipboardList size={19} />
              <span>Запрос КП</span>
              <b>{count}</b>
            </Link>
            <button ref={opener} className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="overlay" role="presentation" onMouseDown={() => setMenuOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <h2 id="mobile-menu-title">Меню</h2>
              <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X size={22} /></button>
            </div>
            <nav className="drawer-nav">
              {nav.map(([href, label]) => (
                <NavLink key={href} to={href} onClick={() => setMenuOpen(false)} end={href === '/'}>{label}</NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <Logo />
          <p>Демонстрационный проект. Компания GRAVITON является вымышленной.</p>
          <p>Москва, промзона «Северная», пав. 4 · sales@graviton-machinery.ru</p>
        </div>
      </footer>
    </>
  );
}
