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
        <div className="container process-grid">
          <div className="process-copy">
            <span className="eyebrow">Порядок сделки</span>
            <h2>Этапы покупки</h2>
            <ol className="steps">
              <li><span>01</span><strong>Подбор</strong><p>Вы выбираете машины в каталоге и отправляете заявку на расчет.</p></li>
              <li><span>02</span><strong>Уточнение</strong><p>Менеджер фиксирует объект, комплектацию, бюджет и сроки поставки.</p></li>
              <li><span>03</span><strong>КП и условия</strong><p>Готовим спецификацию, оплату, лизинг и маршрут отгрузки.</p></li>
              <li><span>04</span><strong>Передача техники</strong><p>Проводим осмотр, диагностику, документы и перевозку до площадки.</p></li>
            </ol>
          </div>
          <div className="contact-panel process-panel">
            <h3>Быстрый запрос</h3>
            <p>Оставьте выбранную технику в заявке, а контактные поля заполните на следующем шаге.</p>
            <Link className="btn btn-primary" to="/request">Открыть заявку</Link>
          </div>
        </div>
      </section>
    </>
  );
}
