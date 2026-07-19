import { ClipboardList, Phone, X } from 'lucide-react';
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
  const handleClick = () => {
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return (
    <Link to="/" className="logo" aria-label="GRAVITON - на главную" onClick={handleClick}>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 42" focusable="false">
          <path className="logo-shield" d="M24 4 40 13v16L24 38 8 29V13L24 4Z" />
          <path className="logo-core" d="M24 12 32.5 16.8v8.4L24 30l-8.5-4.8v-8.4L24 12Z" />
          <path className="logo-arm" d="M23.8 12.2 34.8 18.4v8.7l-10.7 6.1" />
          <path className="logo-bucket" d="M15.2 24.4 22.8 28.8 18.5 31.2 11.2 27.1l4-2.7Z" />
        </svg>
      </span>
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

  const closeMenu = (returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => opener.current?.focus());
    }
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
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
            <button
              ref={opener}
              className={`icon-button mobile-only menu-toggle ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-controls="mobile-menu-drawer"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`overlay menu-overlay ${menuOpen ? 'is-open' : ''}`}
        role="presentation"
        aria-hidden={!menuOpen}
        onMouseDown={() => closeMenu(true)}
      >
        <aside id="mobile-menu-drawer" className="drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className="drawer-head">
            <h2 id="mobile-menu-title">Меню</h2>
            <button className="icon-button" onClick={() => closeMenu(true)} aria-label="Закрыть меню"><X size={22} /></button>
          </div>
          <nav className="drawer-nav">
            {nav.map(([href, label]) => (
              <NavLink key={href} to={href} onClick={() => closeMenu()} end={href === '/'}>{label}</NavLink>
            ))}
          </nav>
        </aside>
      </div>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <Logo />
          <p>Поставка, лизинг и сервис строительной техники для коммерческих объектов.</p>
          <p>Москва, промзона «Северная», пав. 4 · sales@graviton-machinery.ru</p>
        </div>
      </footer>
    </>
  );
}
