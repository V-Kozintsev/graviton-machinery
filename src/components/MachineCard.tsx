import { Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/catalog';
import { useRequest } from '../state/RequestContext';
import type { Machine } from '../types';
import { formatPrice } from '../utils/format';
import { Button } from './Button';
import { MachineImage } from './Image';

export function MachineCard({ machine }: { machine: Machine }) {
  const request = useRequest();
  const added = request.has(machine.slug);

  return (
    <article className="machine-card">
      <Link to={`/catalog/${machine.slug}`} className="machine-card-image">
        <MachineImage name={machine.image} alt={machine.alt} className="cover" />
      </Link>
      <div className="machine-card-body">
        <div className="card-meta">
          <span>{categories[machine.category].title}</span>
          <span>{machine.availability}</span>
        </div>
        <h3><Link to={`/catalog/${machine.slug}`}>{machine.name}</Link></h3>
        <p className="sku">{machine.sku} · {machine.condition}</p>
        <div className="spec-row">{machine.highlights.map((item) => <span key={item}>{item}</span>)}</div>
        <strong className="price">{formatPrice(machine.price)}</strong>
        <div className="card-actions">
          <Link className="btn btn-secondary" to={`/catalog/${machine.slug}`}>Смотреть</Link>
          <Button onClick={() => request.add(machine.slug)} variant={added ? 'secondary' : 'primary'}>
            {added ? <Check size={18} /> : <Plus size={18} />} {added ? 'Добавлено' : 'В заявку'}
          </Button>
        </div>
      </div>
    </article>
  );
}
