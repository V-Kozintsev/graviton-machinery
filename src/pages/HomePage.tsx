import { ArrowRight, BadgeCheck, Banknote, Truck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, catalog } from '../data/catalog';
import { MachineCard } from '../components/MachineCard';
import { MachineImage } from '../components/Image';

export function HomePage() {
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
              <div><dt>120+</dt><dd>единиц под поставку</dd></div>
              <div><dt>35-50 т</dt><dd>автокраны и тяжелая техника</dd></div>
              <div><dt>7 дней</dt><dd>отгрузка популярных позиций</dd></div>
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
            <p>От выбора модели до передачи машины на площадке: фиксируем условия, готовим документы и держим понятный график отгрузки.</p>
          </div>
          <ol className="steps">
            <li><span>01</span><strong>Подбор</strong><p>Вы выбираете позиции в каталоге или описываете задачу объекта.</p></li>
            <li><span>02</span><strong>Расчет</strong><p>Уточняем комплектацию, состояние, бюджет и сроки поставки.</p></li>
            <li><span>03</span><strong>КП и договор</strong><p>Передаем спецификацию, условия оплаты, лизинг и пакет документов.</p></li>
            <li><span>04</span><strong>Отгрузка</strong><p>Проводим диагностику, осмотр и организуем доставку тралом.</p></li>
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
