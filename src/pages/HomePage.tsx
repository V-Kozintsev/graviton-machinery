import { ArrowRight, BadgeCheck, Banknote, ClipboardCheck, FileText, Search, Truck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, catalog } from '../data/catalog';
import { MachineCard } from '../components/MachineCard';
import { MachineImage } from '../components/Image';

export function HomePage() {
  const processSteps = [
    [Search, '01', 'Подбор', 'Определяем тип машины, навесное оборудование и ограничения площадки.'],
    [ClipboardCheck, '02', 'Проверка', 'Подтверждаем наличие, состояние, ПСМ и готовность к осмотру.'],
    [FileText, '03', 'КП и договор', 'Фиксируем цену, лизинг, сроки оплаты и пакет документов.'],
    [Truck, '04', 'Отгрузка', 'Проводим диагностику, фотоотчет и доставку тралом на объект.'],
  ] as const;
  const heroStats = [
    [ClipboardCheck, '120+', 'единиц под поставку', 'склад и партнерские площадки'],
    [BadgeCheck, '35-50 т', 'тяжелый класс', 'автокраны, экскаваторы, бульдозеры'],
    [Truck, '7 дней', 'быстрая отгрузка', 'для популярных позиций'],
  ] as const;

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">B2B-поставка · техника в наличии и под заказ</span>
            <h1>GRAVITON — строительная техника</h1>
            <p>Подбираем экскаваторы, погрузчики, автокраны и дорожные машины под задачи объекта, бюджет и сроки поставки.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/catalog">Смотреть каталог <ArrowRight size={18} /></Link>
              <Link className="btn btn-secondary" to="/request">Получить предложение</Link>
            </div>
            <dl className="hero-stats">
              {heroStats.map(([Icon, value, label, note]) => (
                <div key={value}>
                  <Icon size={19} />
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                  <small>{note}</small>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-media">
            <MachineImage name="hero" alt="Современная строительная техника на реальной площадке" className="cover" priority />
          </div>
        </div>
      </section>
      <section className="scale-band" aria-label="Операционные возможности GRAVITON">
        <div className="container scale-grid">
          <div>
            <span className="eyebrow">Операционная поставка</span>
            <h2>Техника для объектов, где простой стоит дороже скидки</h2>
          </div>
          <p>Подбираем машины под график работ, резервируем позиции, готовим документы для лизинга и организуем перевозку тралом до площадки.</p>
          <div className="scale-facts">
            <span>Складской осмотр</span>
            <span>Предпродажная диагностика</span>
            <span>Доставка по РФ</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Категории техники</h2><Link to="/catalog">В каталог</Link></div>
          <div className="category-grid">
            {Object.entries(categories).map(([slug, item]) => (
              <Link className="category-card" key={slug} to={`/catalog?category=${slug}`}>
                <MachineImage name={item.image} alt={item.title} className="cover" />
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section muted">
        <div className="container">
          <div className="section-head"><h2>Популярные модели</h2><Link to="/catalog">Все позиции</Link></div>
          <div className="catalog-grid">{catalog.slice().sort((a, b) => b.popular - a.popular).slice(0, 3).map((machine) => <MachineCard key={machine.slug} machine={machine} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container feature-grid">
          {[
            [Truck, 'Доставка', 'Организуем перевозку низкорамными тралами и подготовим маршрутные документы.'],
            [Banknote, 'Лизинг', 'Подготовим коммерческое предложение для лизинговой компании и согласуем график.'],
            [Wrench, 'Сервис', 'Перед выдачей проводим диагностику, регламент и фотоотчет по узлам.'],
            [BadgeCheck, 'Документы', 'Передаем ПСМ, договор, счет и акт приема-передачи в одном пакете.'],
          ].map(([Icon, title, text]) => (
            <article className="feature" key={String(title)}>
              <Icon size={28} />
              <h3>{String(title)}</h3>
              <p>{String(text)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section muted">
        <div className="container process-block">
          <div className="section-head">
            <div>
              <span className="eyebrow">Порядок сделки</span>
              <h2>Как проходит покупка техники</h2>
            </div>
            <p>От подбора модели до передачи машины на площадке: каждый этап фиксируется в КП, договоре и графике отгрузки.</p>
          </div>
          <ol className="steps">
            {processSteps.map(([Icon, number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <Icon size={22} />
                <strong>{title}</strong>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="deal-result">
            <div>
              <strong>Итог для покупателя</strong>
              <p>Подтвержденная техника, прозрачная стоимость, документы для сделки и согласованный маршрут доставки.</p>
            </div>
            <Link className="btn btn-primary" to="/request">Открыть заявку <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
