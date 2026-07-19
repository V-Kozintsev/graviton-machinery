import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="page-section success-screen">
      <div className="container narrow">
        <h1>Страница не найдена</h1>
        <p>Похоже, такой страницы нет в каталоге GRAVITON.</p>
        <Link className="btn btn-primary" to="/">На главную</Link>
      </div>
    </section>
  );
}
