import { CalendarDays, Check, ClipboardList, PhoneCall, Plus, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/catalog';
import { useRequest } from '../state/RequestContext';
import type { Machine } from '../types';
import { formatPrice } from '../utils/format';
import { getKeySpecs, getSalesMailHref } from '../utils/machineCommercial';
import { Button } from './Button';
import { MachineImage } from './Image';

export function MachineCard({ machine }: { machine: Machine }) {
  const request = useRequest();
  const added = request.has(machine.slug);
  const keySpecs = getKeySpecs(machine);

  return (
    <article className="machine-card">
      <Link to={`/catalog/${machine.slug}`} className="machine-card-image">
        <MachineImage name={machine.image} alt={machine.alt} className="cover" />
      </Link>
      <div className="machine-card-body">
        <div className="card-meta">
          <span>{categories[machine.category].title}</span>
          <span className="availability">{machine.availability}</span>
        </div>
        <h3><Link to={`/catalog/${machine.slug}`}>{machine.name}</Link></h3>
        <div className="card-commercial">
          <span><ClipboardList size={15} /> {machine.sku}</span>
          <span><CalendarDays size={15} /> {machine.year} год</span>
          <span><ShieldCheck size={15} /> {machine.condition}</span>
        </div>
        <div className="card-spec-grid">
          {keySpecs.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <strong className="price">{formatPrice(machine.price)}</strong>
        <div className="card-actions">
          <Link className="btn btn-secondary" to={`/catalog/${machine.slug}`}>Смотреть</Link>
          <Button onClick={() => request.add(machine.slug)} variant={added ? 'secondary' : 'primary'}>
            {added ? <Check size={18} /> : <Plus size={18} />} {added ? 'Добавлено' : 'В заявку'}
          </Button>
        </div>
        <a className="sales-card-link" href={getSalesMailHref(machine)}><PhoneCall size={16} /> Связаться с отделом продаж</a>
      </div>
    </article>
  );
}
