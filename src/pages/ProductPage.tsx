import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { MachineImage } from '../components/Image';
import { MachineCard } from '../components/MachineCard';
import { catalog, categories, getMachine } from '../data/catalog';
import { useRequest } from '../state/RequestContext';
import { formatPrice } from '../utils/format';

export function ProductPage() {
  const { slug = '' } = useParams();
  const machine = getMachine(slug);
  const request = useRequest();
  const [selected, setSelected] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    onSelect();
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  if (!machine) return <Navigate to="/404" replace />;
  const similar = catalog.filter((item) => item.category === machine.category && item.slug !== machine.slug).slice(0, 3);
  const gallery = [machine.image, machine.image, machine.image];
  const added = request.has(machine.slug);

  return (
    <section className="page-section">
      <div className="container">
        <Link className="back-link" to="/catalog"><ArrowLeft size={18} /> Назад в каталог</Link>
        <div className="product-grid">
          <div>
            <div className="embla" ref={emblaRef} tabIndex={0} onKeyDown={(event) => {
              if (event.key === 'ArrowRight') embla?.scrollNext();
              if (event.key === 'ArrowLeft') embla?.scrollPrev();
            }}>
              <div className="embla-track">
                {gallery.map((image, index) => <div className="embla-slide" key={`${image}-${index}`}><MachineImage name={image} alt={`${machine.alt}, фото ${index + 1}`} className="cover" priority={index === 0} /></div>)}
              </div>
            </div>
            <div className="thumbs">{gallery.map((image, index) => <button key={index} className={selected === index ? 'active' : ''} onClick={() => embla?.scrollTo(index)}><MachineImage name={image} alt="" className="cover" /></button>)}</div>
          </div>
          <div className="product-info">
            <span className="eyebrow">{categories[machine.category].title} · {machine.sku}</span>
            <h1>{machine.name}</h1>
            <div className="status-row"><span>{machine.condition}</span><span>{machine.availability}</span><span>{machine.year} год</span></div>
            <strong className="product-price">{formatPrice(machine.price)}</strong>
            <div className="spec-row large">{machine.highlights.map((item) => <span key={item}>{item}</span>)}</div>
            <Button onClick={() => request.add(machine.slug)} variant={added ? 'secondary' : 'primary'}>{added ? <Check size={18} /> : <Plus size={18} />} {added ? 'Добавлено в заявку' : 'Добавить в заявку'}</Button>
            <p>{machine.description}</p>
            <h2>Технические параметры</h2>
            <table className="spec-table"><tbody>{Object.entries(machine.specs).map(([key, value]) => <tr key={key}><th>{key}</th><td>{value}</td></tr>)}</tbody></table>
            <h2>Комплектация</h2>
            <ul className="check-list">{machine.equipment.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="info-band"><p><strong>Доставка:</strong> трал по РФ, согласование погрузки и страховки.</p><p><strong>Лизинг:</strong> подготовим КП и спецификацию для сделки.</p><p><strong>Гарантия:</strong> демонстрационные условия 6 месяцев на основные узлы.</p></div>
          </div>
        </div>
        <section className="section related"><div className="section-head"><h2>Похожие модели</h2></div><div className="catalog-grid">{similar.map((item) => <MachineCard key={item.slug} machine={item} />)}</div></section>
      </div>
    </section>
  );
}
