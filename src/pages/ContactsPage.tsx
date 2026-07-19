import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactsPage() {
  return (
    <section className="page-section">
      <div className="container contact-page">
        <div>
          <span className="eyebrow">Контакты</span>
          <h1>Связаться с GRAVITON</h1>
          <p>Контакты указаны как демонстрационные данные для портфолио-проекта.</p>
          <ul className="contact-list">
            <li><Phone size={20} /> 8 800 550-19-84</li>
            <li><Mail size={20} /> sales@graviton-demo.ru</li>
            <li><MapPin size={20} /> Москва, промзона «Северная», павильон 4</li>
          </ul>
        </div>
        <div className="map-placeholder">
          <span>GRAVITON</span>
          <p>Карта-заглушка склада техники</p>
        </div>
      </div>
    </section>
  );
}
