import { BadgeCheck, CalendarDays, Check, ClipboardList, PhoneCall, Plus, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/catalog';
import { useRequest } from '../state/RequestContext';
import type { Machine } from '../types';
import { formatPrice } from '../utils/format';
import { getKeySpecs, getMonthlyLease, getSalesMailHref } from '../utils/machineCommercial';
import { Button } from './Button';
import { MachineImage } from './Image';

export function MachineCard({ machine }: { machine: Machine }) {
  const request = useRequest();
  const added = request.has(machine.slug);
  const keySpecs = getKeySpecs(machine, 5);
  const lease = getMonthlyLease(machine.price);
  const isPopular = machine.popular >= 85;

  return (
    <article className="machine-card">
      <Link to={`/catalog/${machine.slug}`} className="machine-card-image">
        <MachineImage name={machine.image} alt={machine.alt} className="cover" />
        <span className="card-badge">{isPopular ? 'Хит поставок' : 'Проверено'}</span>
      </Link>
      <div className="machine-card-body">
        <div className="card-trust-row">
          <span><BadgeCheck size={16} /> Диагностика</span>
          <span className="availability">{machine.availability}</span>
        </div>
        <h3><Link to={`/catalog/${machine.slug}`}>{machine.name}</Link></h3>
        <div className="card-commercial">
          <span>{categories[machine.category].title}</span>
          <span><ClipboardList size={15} /> {machine.sku}</span>
          <span><CalendarDays size={15} /> {machine.year} год</span>
          <span><ShieldCheck size={15} /> {machine.condition}</span>
        </div>
        <div className="card-price-row">
          <div>
            {machine.price ? <span className="old-price">{formatPrice(Math.round(machine.price * 1.06))}</span> : null}
            <strong className="price">{formatPrice(machine.price)}</strong>
          </div>
          {lease ? (
            <div className="lease-box">
              <span>Лизинг от</span>
              <strong>{formatPrice(lease)} / мес</strong>
            </div>
          ) : <div className="lease-box"><span>Цена</span><strong>по запросу</strong></div>}
        </div>
        <div className="card-actions">
          <a className="btn btn-secondary" href={getSalesMailHref(machine)}>Быстрый запрос</a>
          <Button onClick={() => request.add(machine.slug)} variant={added ? 'secondary' : 'primary'}>
            {added ? <Check size={18} /> : <Plus size={18} />} {added ? 'Добавлено' : 'В заявку'}
          </Button>
        </div>
        <dl className="card-spec-list">
          {keySpecs.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <Link className="sales-card-link" to={`/catalog/${machine.slug}`}>Смотреть характеристики</Link>
        <a className="sales-card-link" href={getSalesMailHref(machine)}><PhoneCall size={16} /> Связаться с отделом продаж</a>
      </div>
    </article>
  );
}
