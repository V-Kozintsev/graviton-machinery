import { Mail, MapPin, Phone } from 'lucide-react';
import { MachineImage } from '../components/Image';

export function ContactsPage() {
  return (
    <section className="page-section">
      <div className="container contact-page">
        <div>
          <span className="eyebrow">Контакты</span>
          <h1>Связаться с GRAVITON</h1>
          <p>Отдел продаж подберет технику под объект, сроки поставки и формат финансирования.</p>
          <ul className="contact-list">
            <li><Phone size={20} /> 8 800 550-19-84</li>
            <li><Mail size={20} /> sales@graviton-machinery.ru</li>
            <li><MapPin size={20} /> Москва, промзона «Северная», павильон 4</li>
          </ul>
        </div>
        <div className="yard-panel">
          <MachineImage name="delivery" alt="Отгрузка строительной техники на низкорамный трал со склада GRAVITON" className="cover" priority />
          <div>
            <span>Склад и зона отгрузки</span>
            <p>Осмотр техники по предварительной записи. Доставка тралом по России и подготовка комплекта документов.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
