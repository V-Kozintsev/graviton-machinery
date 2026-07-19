import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Filters, initialFilters } from '../components/Filters';
import { MachineCard } from '../components/MachineCard';
import { catalog } from '../data/catalog';

export function DesignBoard() {
  return (
    <section className="page-section design-board">
      <div className="container">
        <h1>GRAVITON Design Board</h1>
        <div className="swatches">{['#20252c', '#31566f', '#f5bd1f', '#f4f6f8', '#ffffff', '#d8dee5'].map((color) => <span key={color} style={{ background: color }}>{color}</span>)}</div>
        <div className="board-grid">
          <div><h2>Типографика</h2><h1>Заголовок H1</h1><h2>Заголовок H2</h2><p>Обычный коммерческий текст, ссылка <a href="#/">внутри интерфейса</a>.</p></div>
          <div><h2>Кнопки</h2><button className="btn btn-primary">Основная</button><button className="btn btn-secondary">Вторичная</button><button className="btn btn-primary" disabled>Disabled</button></div>
          <div><h2>Поля</h2><label className="field"><span>Поле</span><input placeholder="Фокус и ввод" /></label><label className="field"><span>Select</span><select><option>Опция</option></select></label><label className="check"><input type="checkbox" /><span>Checkbox</span></label></div>
          <div><h2>Состояния</h2><p className="toast"><CheckCircle size={18} /> Добавлено в заявку</p><p className="toast error"><XCircle size={18} /> Ошибка валидации</p><p className="toast"><Loader2 size={18} /> Загрузка</p></div>
        </div>
        <div className="board-grid two">
          <MachineCard machine={catalog[0]} />
          <Filters value={initialFilters} onChange={() => undefined} onReset={() => undefined} />
        </div>
        <div className="modal-sample"><div className="drawer-head"><h2>Модальное окно</h2><button className="icon-button">×</button></div><p>Drawer и modal используют общий слой, блокировку прокрутки и доступный заголовок.</p></div>
      </div>
    </section>
  );
}
